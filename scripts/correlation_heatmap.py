import seaborn as sns
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

df=pd.read_csv("cancer_patient_data_sets.csv")
df = df.drop('index', axis=1)

# create a mapping dictionary for categorical to numerical values
mapping_dict = {'High': 3, 'Medium': 2, 'Low': 1}

# map the values in 'col1' to numerical values using the mapping dictionary
df['Level_Numeric'] = df['Level'].map(mapping_dict)
# create a correlation matrix


corr = df.corr()


# Set up the plot
fig, ax = plt.subplots(figsize=(10, 10),facecolor='white')

# Create the heatmap
sns.heatmap(corr,
            annot=False,
            cmap='seismic',
            fmt='.2f',
            center=0,
            square=True,
            linewidths=.5,
            cbar_kws={'shrink':.75},
            ax=ax)

# Add axis labels and title
plt.xlabel('Features', fontsize=14)
plt.ylabel('Features', fontsize=14)
plt.title('Correlation Matrix', fontsize=16)

# Adjust font size of annotations
plt.tick_params(labelsize=12)