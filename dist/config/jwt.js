import 'dotenv/config';
const jwt_key = process.env.JWT_SECRET || 'secret_key';
export default jwt_key;
