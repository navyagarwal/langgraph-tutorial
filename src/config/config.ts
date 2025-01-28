
export const config = {
    snowflake: {
        account: process.env.SNOWFLAKE_ACCOUNT,
        username: process.env.SNOWFLAKE_USERNAME,
        password: process.env.SNOWFLAKE_PASSWORD,
        warehouse: process.env.SNOWFLAKE_WAREHOUSE,
        database: process.env.SNOWFLAKE_DATABASE,
        schema: process.env.SNOWFLAKE_SCHEMA
    },
    openai: {
        apiKey: process.env.OPENAI_API_KEY
    }
};