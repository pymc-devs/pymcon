import autograd.numpy as np
from minimc import neg_log_mvnormal, mixture
from minimc.autograd_interface import AutogradPotential
from minimc.integrators_slow import leapfrog as leapfrog_slow
import scipy.stats as st
import matplotlib.pyplot as plt


mu1 = np.ones(2)
cov1 = 0.5 * np.array([[1.0, 0.7], [0.7, 1.0]])
mu2 = -np.ones(2)
cov2 = 0.2 * np.array([[1.0, -0.6], [-0.6, 1.0]])

mu3 = np.array([-1.0, 2.0])
cov3 = 0.3 * np.eye(2)

neg_log_p = mixture(
    [
        neg_log_mvnormal(mu1, cov1),
        neg_log_mvnormal(mu2, cov2),
        neg_log_mvnormal(mu3, cov3),
    ],
    [0.3, 0.3, 0.4],
)

np.random.seed(16)
momenta = st.norm(0, 1).rvs(size=(5, 2))
n = 5
initial_positions = st.norm(0, 0.1).rvs(size=(n, 2))

all_positions = []
for initial_position in initial_positions:
    potential = AutogradPotential(neg_log_p)
    negative_log_prob = lambda q: potential(q)[0]  # NOQA
    dVdq = lambda q: potential(q)[1]  # NOQA

    # collect all our samples in a list
    samples = [initial_position]
    positions = []
    for p0 in momenta:
        # Integrate over our path to get a new position and momentum
        q_new, p_new, path, momentums, _ = leapfrog_slow(
            samples[-1], p0, dVdq, path_len=10, step_size=0.01
        )
        positions.append(path)
        samples.append(q_new)
    all_positions.append(np.array(positions))


fig, ax = plt.subplots(
    figsize=np.array([1469, 720]) / plt.rcParams["figure.dpi"], constrained_layout=True
)
idxs = [0, 3, 1, 2, 4]
colors = ["#504a4e", "#2185d0", "#2185d0", "#504a4e", "#12698a"]
for idx in idxs:
    positions = all_positions[idx]
    ax.plot(*positions[4].T, "-", lw=3, color=colors[idx], alpha=1)
    ax.plot(*positions[4, -1], "o", ms=15, color=colors[idx], mfc="#000000", mew=3)

fig.set_facecolor("#000000")
ax.set_axis_off()

fig.savefig("contact.png", pad_inches=0.0, transparent=True)
