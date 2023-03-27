# Lung Cancer Prediction using Machine Learning
This project is a survey assessment form and admin dashboard built using React on Next.js, and python ml libraries.
The main goal of the application is to allow users to find out their lung cancer risk level, and to showcase our database learning throughout this module.
We are using a SQL databse hosted on PlanetScale (cloud provider), with Prisma object relational mapper to support our CRUD serverless function api calls.
This project is built and managed by Team37 for CSC2008-Database module.

## Team37 Members
Name | Student ID | Github Username
--- | --- | ---
**Dylan Tok** | 2101372 | [@dthx2710](https://github.com/dthx2710)
**Chong Wei Bing** | 1802754 | [@cwb07](https://github.com/cwb07)
**Xu Xueli** | 2101812 | [@xx-ue](https://github.com/xx-ue)
**Teo Leng** | 2102311 | [@tlengz](https://github.com/tlengz)
**Lim Wei Jie** | 2101242 | [@penguiny](https://github.com/peguiny)
**Jared Teo** | 2101979 | [@JaredTeo311](https://github.com/JaredTeo311)

## Instructions to run the program locally
- Clone the repository
    > `git clone`
- Install Dependencies & Packages
    > `npm install`
 - Initialize python venv for prediction model api. Use `initlinux` instead if on Linux OS
    > `npm run init` or `npm run initlinux`
- Create a `.env` file in the working directory
    - You can use the .env.sample file as a template
    - Update OS_ENV environment key to `LINUX` if on Linux OS for ml scripts to run properly
- Build the program
    > `npm run build`
- Run the program
    > `npm start` 
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage
- Risk Assessment Survey
    - Fill in your details and factors, range of minimum number is good/healthy, maximum number is bad/unhealthy
    - Submit and view your results from our prediction model
    - Your results be added to the database anonymously
- Admin Dashboard
    - Admin account details are in Users table of the database, but here are some test accounts to login:
        Username | Password
        --- | ---
        art | 8NAADrwQ1nS5
        beverie | ozJxVgU6
        cazzie | o4wrmXLeRVM
        cynthea | QnskuXu
        dolicon | doliconnn
    - Admin dashboard provides basic data visualization and a table view with filters and edit/delete features
    
## Screenshots

**Home Page**
![home](https://user-images.githubusercontent.com/37941268/227802278-eed4c255-8761-48d8-acf4-c64ccc7d367c.png)


**Survey Results**
![results](https://user-images.githubusercontent.com/37941268/227802304-377e208f-54dc-4d83-9bef-88169f789ebf.png)


**Admin Dashboard**
![dashboard](https://user-images.githubusercontent.com/37941268/227802451-e2c82507-56a5-40f5-a814-48d235efa715.png)


**Data Table and Filters**
![table](https://user-images.githubusercontent.com/37941268/227802499-57674104-2c4b-4c58-9a43-7bb6a4ff4a4b.png)


## Others
- Database visualization GUI Tool
    > Run `npx prisma studio`
- Planetscale (Cloud SQL Database) performance analytics
    1. Go to [Planetscale](https://planetscale.com/)
    2. Login using test account credentials:
        - Email: `csc2008team37@gmail.com`
        - Password: `csc2008team372023`
    3. Go to [project dashboard](https://app.planetscale.com/dolicon/csc2008-team37-2023)
    4. Navigate to [**Insights** tab](https://app.planetscale.com/dolicon/csc2008-team37-2023/main/insights)
    5. View analytics (Query latencies, Qps, Rows r/w, etc)
- Kaggle Dataset Used
    > https://www.kaggle.com/datasets/thedevastator/cancer-patients-and-air-pollution-a-new-link
