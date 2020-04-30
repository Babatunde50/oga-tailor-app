import { Plugins } from '@capacitor/core';
const { Geolocation } = Plugins;

const getCurrentPosition = async () => {
	const coordinates: any = await Geolocation.getCurrentPosition();
	return { lat: coordinates.coords.latitude, lng: coordinates.coords.longitude };
};

export default getCurrentPosition;
