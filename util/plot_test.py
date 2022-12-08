import matplotlib.pyplot as plt
import pandas as pd

### 3D scatter plot ###

#df_gyro = pd.read_csv (r'./test_fix_gyro.csv')
df_acc = pd.read_csv (r'./project_data/test_fix_acc.csv')

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
plt.savefig('./public/acc_scatter_test.png')

