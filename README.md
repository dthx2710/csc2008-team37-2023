# Lung Cancer Risk Assessment Survey
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
- CD to working directory
    > `cd gray-app`
- Install Dependencies & Packages
    > `npm install`
 - Initialize python venv for prediction model api. run "pyinitlinux" instead if on Linux OS
    > npm run pyinit
- Create a `.env` file in the working directory
    - You can use the .env.sample file as a template
- Build the program
    > `npm run build`
- Run the program
    > `npm run dev` or `npm start`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.
