export const getCoordsForAddress = async (address: any) => {
	try {
		const response = await fetch(
			`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
				address
			)}&key=AIzaSyDBySWklB-zkl3UrFlybOj0OBn7TeUR5WU`
		);

		if (!response.ok) {
			throw new Error('Something went wrong');
		}

		const resData = await response.json();

		if (!resData || resData === 'ZERO_RESULTS') {
			throw new Error('Could not find location for the specified address');
		}

		const coordinates = resData.results[0].geometry.location;
		return coordinates;
	} catch (err) {
		console.log(err);
	}
};
