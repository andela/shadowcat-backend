import dotenv from 'dotenv';

dotenv.config();

const envVariables = {
  secret:
        process.env.NODE_ENV === 'production' ? process.env.SECRET : 'secret',
  port: process.env.PORT
};

export default envVariables;
