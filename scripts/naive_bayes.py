import sys
import json
from flask import Flask, request, jsonify
import pandas as pd
from sklearn.naive_bayes import GaussianNB
from sklearn.metrics import accuracy_score, classification_report

# load the CSV data from the request body
df = pd.read_csv('./scripts/cancer_patient_data_sets.csv')

# remove the 'index' column
df = df.drop('index', axis=1)

# split the data into training and testing sets
training_size = int(len(df) * 0.8)
train_df = df[:training_size]
test_df = df[training_size:]

# train the model
X = train_df[['Age', 'Gender', 'Air Pollution', 'Alcohol use', 'Dust Allergy', 'OccuPational Hazards', 'Genetic Risk', 'chronic Lung Disease', 'Balanced Diet', 'Obesity', 'Smoking', 'Passive Smoker', 'Chest Pain', 'Coughing of Blood', 'Fatigue', 'Weight Loss', 'Shortness of Breath', 'Wheezing', 'Swallowing Difficulty', 'Clubbing of Finger Nails', 'Frequent Cold', 'Dry Cough', 'Snoring']]
y = train_df['Level']
clf = GaussianNB()
clf.fit(X, y)

# # make predictions on the test data
# X_new = test_df[['Age', 'Gender', 'Air Pollution', 'Alcohol use', 'Dust Allergy', 'OccuPational Hazards', 'Genetic Risk', 'chronic Lung Disease', 'Balanced Diet', 'Obesity', 'Smoking', 'Passive Smoker', 'Chest Pain', 'Coughing of Blood', 'Fatigue', 'Weight Loss', 'Shortness of Breath', 'Wheezing', 'Swallowing Difficulty', 'Clubbing of Finger Nails', 'Frequent Cold', 'Dry Cough', 'Snoring']]
# y_pred = clf.predict(X_new)



data = json.loads(sys.stdin.read())
X_new = pd.DataFrame(data, index=[0])
y_pred = clf.predict(X_new)
result = y_pred[0]
sys.stdout.write(result)
sys.stdout.flush()

## Code to generate classification_report
# from sklearn.metrics import accuracy_score, classification_report
# y_test = test_df['Level_Num']
# print('Accuracy Score: {:.2f}'.format(accuracy_score(y_test, y_pred)))
# print(classification_report(y_test, y_pred))