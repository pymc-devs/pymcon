import os

import matplotlib.pyplot as plt

# Config:
images_dir = "../css/2017_style/img/team/"
result_grid_filename = "./team.png"
result_figsize_resolution = 2  # 1 = 100px

images_list = [
    img for img in os.listdir(images_dir) if img not in {"Pymc4.png", "TBD.jpg"}
]
image_arys = [plt.imread(f"{images_dir}/{img}", 0) for img in images_list]
image_arys = sorted(image_arys, key=lambda x: x.shape[1] / x.shape[0])
images_count = len(images_list)

# Calculate the grid size:
ncol = 4
grid_size = images_count // ncol + 1

# Create plt plot:
fig, axes = plt.subplots(
    grid_size,
    ncol,
    figsize=(result_figsize_resolution, result_figsize_resolution),
)

for idx, ax in enumerate(axes.ravel()):
    ax.axis("off")

    if idx < len(image_arys):
        ax.imshow(image_arys[idx])

fig.subplots_adjust(left=0, bottom=0, right=1, top=1, wspace=0, hspace=0)
fig.savefig(result_grid_filename)
