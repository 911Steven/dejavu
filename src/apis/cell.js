import appbase from 'appbase-js';
import { parseUrl, getCustomHeaders, convertArrayToHeaders } from '../utils';
import CustomError from '../utils/CustomError';

const setCellValue = async (app, type, rawUrl, id, property, value) => {
	const customHeaders = getCustomHeaders(app);
	try {
		const { url, credentials } = parseUrl(rawUrl);
		const api = appbase({
			app,
			url,
			credentials,
		});
		api.setHeaders(convertArrayToHeaders(customHeaders));
		const res = await api.update({
			type,
			id,
			body: {
				doc: {
					[property]: value,
				},
			},
		});
		return res;
	} catch (error) {
		const errorMessage = error.statusText || 'Unable to update data';

		throw new CustomError(
			JSON.stringify(error.error || errorMessage, null, 2),
			error.errorMessage,
			error.stack,
		);
	}
};

export default setCellValue;
