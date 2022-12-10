import matplotlib.pyplot as plt
import pandas as pd

import math
import numpy as np
from scipy.signal import find_peaks
import difflib
import sys

### 3D scatter plot ###
args = sys.argv
#df_gyro = pd.read_csv (r'./test_fix_gyro.csv')
df_acc = pd.read_csv (rf'./project_data/dataset/{args[1]}')

print(df_acc)

fig = plt.figure()
ax = fig.add_subplot(projection='3d')

"""
ax.scatter(df_gyro['gyroX'], df_gyro['gyroY'], df_gyro['gyroZ'])

ax.set_xlabel('gyroX')
ax.set_ylabel('gyroY')
ax.set_zlabel('gyroZ')
"""

ax.scatter(df_acc['accX'], df_acc['accY'], df_acc['accZ'])

ax.set_xlabel('accX')
ax.set_ylabel('accY')
ax.set_zlabel('accZ')

#plt.show()
#plt.savefig('./gyro_scatter.png')
plt.savefig(f'./public/acc_scatter_test_{args[2]}.png')


### counting steps ###

t = df_acc.iloc[:, 0]
aX = df_acc.iloc[:, 1]
aY = df_acc.iloc[:, 2]
aZ = df_acc.iloc[:, 3]

mag_list = []
magNoG_list = []
t_list = []

def difference(string1, string2):
    # Split both strings into list items
    string1 = string1.split()
    string2 = string2.split()

    A = set(string1) # Store all string1 list items in set A
    B = set(string2) # Store all string2 list items in set B

    str_diff = A.symmetric_difference(B)

    return str_diff


for index, row in df_acc.iterrows():
    mag = math.sqrt(aX[index] ** 2 + aY[index] ** 2 + aZ[index] ** 2)
    mag = round(mag, 2)
    mag_list.append(mag)
    t_list.append(t[index])
#print(mag_list)

mean = np.mean(mag)

for i in mag_list:
    magNoG = round(i - mean, 2)
    magNoG_list.append(magNoG)
#print(magNoG_list)


# time lapse
output = list(difference(str(t_list[0]), str(t_list[-1])))
#print(output)
start = output[0].split(':')
stop = output[1].split(':')
stop_sec = int(stop[0]) * 60 * 60 + int(stop[1]) * 60 + int(stop[2]) #seconds
start_sec = int(start[0]) * 60 * 60 + int(start[1]) * 60 + int(start[2])
if stop_sec > start_sec:
    time_lapse = stop_sec - start_sec
else:
    time_lapse = start_sec - stop_sec
#print(start)
#print(stop)
#print(time_lapse)


x = np.linspace(0, time_lapse, len(magNoG_list))

peaks = find_peaks(magNoG_list, height = -1, threshold = 0, distance = 1)
height = peaks[1]['peak_heights']
peak_pos = x[peaks[0]]

fig_2 = plt.figure()
ax_2 = fig_2.subplots()
ax_2.plot(x, magNoG_list)
ax_2.scatter(peak_pos, height, color = 'r', s = 15, marker = 'D')
ax_2.grid()
plt.title("Number of Times = " + str(len(peak_pos)))
#plt.show()
plt.savefig(f'./public/acc_linechart_test_{args[2]}.png')

