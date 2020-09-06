"""
This is a lot. There are two functions at the top that are a little handy, otherwise, install
matplotlib, numpy, and scipy, and just `python gen_logo.py`. There is no command line argument
handling. Just... write some code and play with it. I think the following could be useful (use
ctrl+f to find where to mess with this stuff):

- dpi: make the figure bigger or smaller with this, *not* figsize.
- ex.width: in super_text, this controls how far apart the letters are. sometimes it changes for not
  very good reasons, and you have to play with this until the text looks good again. It is 0.9 in a
  jupyter notebook.
- That's it. Good luck if you want to change anything else. House of cards here.
"""
from urllib.request import urlopen
from tempfile import NamedTemporaryFile

import numpy as np
from matplotlib import transforms
import matplotlib.font_manager as fm
import matplotlib.patheffects as path_effects
import matplotlib.pyplot as plt
import scipy.stats as st


def super_text(x, string, different_kwargs, ax, **kwargs):
    """Matplotlib text with super powers."""
    t = ax.transData
    canvas = ax.figure.canvas

    for s, nkwargs in zip(string, different_kwargs):
        new_kwargs = kwargs.copy()
        new_kwargs.update(nkwargs)
        if "size" in nkwargs:
            new_kwargs["fontproperties"].set_size(nkwargs["size"])
        y = new_kwargs.pop("y")
        text = ax.text(x, y, s, transform=t, **new_kwargs)
        # Need to draw to update the text position.
        text.draw(canvas.get_renderer())
        ex = text.get_window_extent()
        t = transforms.offset_copy(text.get_transform(), x=ex.width * 0.6, units="dots")


def get_google_font(font_name):
    """Download a google font as a temporary file.

    Use with:
        font_file = get_google_font("Oswald-Bold")
        prop = font_manager.FontProperties(fname=font_file.name)
        plt.text(..., fontproperties=prop)
    """
    f = NamedTemporaryFile(delete=False, suffix=".ttf")
    f.write(
        urlopen(
            f"https://github.com/google/fonts/blob/master/ofl/oswald/static/{font_name}.ttf?raw=True"
        ).read()
    )
    f.close()
    return f


if __name__ == "__main__":
    font_file = get_google_font("Oswald-Bold")
    prop = fm.FontProperties(fname=font_file.name)
    np.random.seed(0)
    fig, ax = plt.subplots(figsize=(12, 12))
    fig.set_dpi(144)
    r_ = 0.96
    θ = np.linspace(0, 2 * np.pi, 1000)

    # via https://mycolor.space/?hex=%2312698A&sub=1
    dark = "#504a4e"
    blue = "#12698a"
    light = "#9AAEBB"

    ################
    # Border stuff #
    ################
    for r in (1, r_):
        ax.plot(r * np.cos(θ), r * np.sin(θ), color=dark, lw=6)

    ax.plot((r_ + 1) / 2 * np.cos(θ), (r_ + 1) / 2 * np.sin(θ), color=light, lw=6)

    #################
    # Density stuff #
    #################
    def logp(t):
        rv1 = st.norm(0.7, 0.2)
        rv2 = st.norm(-0.5, 0.3)
        rv3 = st.norm(0.1, 0.15)
        return 0.2 * rv1.pdf(t) + 0.5 * rv2.pdf(t) + 0.3 * rv3.pdf(t)

    θ_part = θ[500:]
    x = np.cos(θ_part)
    hi = 0.5 * logp(x)

    lo = r_ * np.sin(θ_part)
    hi -= 0.6

    in_bounds = hi > lo

    cut = 3
    ax.plot(
        x[in_bounds][cut:-cut],
        hi[in_bounds][cut:-cut],
        "-",
        color=dark,
        lw=20,
        solid_capstyle="butt",
        zorder=-1,
    )
    ax.plot(x[in_bounds], hi[in_bounds], "-", color=light, lw=6, solid_capstyle="butt")

    ax.fill_between(x[in_bounds], lo[in_bounds], hi[in_bounds], color=blue)

    ##############
    # Text stuff #
    ##############
    kwargs = dict(
        y=0.3,
        va="bottom",
        fontname="Ubuntu Condensed",
        fontweight="bold",
        fontproperties=prop,
        ha="center",
    )
    prop.set_size(120)

    t = super_text(
        -0.45,
        "PY MCon",
        [
            {"color": dark},
            {"color": dark, "size": 90, "y": 0.32},
            {"color": dark, "y": 0.3, "size": 120},
            {"color": dark},
            {"color": blue},
            {"color": blue},
            {"color": blue},
        ],
        ax=ax,
        **kwargs,
    )

    prop.set_size(90)

    kwargs.pop("y")
    kwargs["color"] = light
    kwargs["ha"] = "center"
    text = ax.text(0.0, -0.83, "2020", **kwargs)
    text.set_path_effects(
        [path_effects.Stroke(linewidth=12, foreground=dark), path_effects.Normal()]
    )
    ##############
    # Traceplot  #
    ##############

    θ_part = θ[500:]
    x = np.cos(θ_part)
    y = st.norm(0, 0.2).rvs((4, x.size))

    colors = (blue, dark, light)
    for yy, c in zip(y, colors):
        n = 5
        ret = np.cumsum(yy, dtype=float)
        ret[n:] = ret[n:] - ret[:-n]
        yy = ret[n - 1 :] / n
        off = n // 2
        xx, yy = x[off:-off], yy + hi[off:-off] + 0.35
        to_plot = xx ** 2 + yy ** 2 < r_
        ax.plot(xx[to_plot], yy[to_plot], lw=3, zorder=-10, color=c)

    ax.axis("off")
    ax.set_aspect("equal")
    fig.savefig("pymcon_logo.png", transparent=True)
