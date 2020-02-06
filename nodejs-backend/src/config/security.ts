import {registerAs} from '@nestjs/config';

export const CONFIG_TOKEN = 'security';

export default registerAs(CONFIG_TOKEN, () => {
	return {
		jwt: {
			secret: process.env.AUTH_JWT_SECRET || 'test',
		},
		auth: {
			resetPasswordUrl: process.env.AUTH_RESET_PASSWORD_URL,
			confirmEmailUrl: process.env.AUTH_CONFIRM_EMAIL_URL,
		},
	};
});
