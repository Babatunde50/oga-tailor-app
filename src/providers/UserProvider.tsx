import React, { useState, createContext, useEffect } from 'react';
import { auth, createUserProfileDocument } from '../firebase';

export const UserContext = createContext(null);

const UserProvider: React.FC = ({ children }) => {
	const [user, setUser] = useState();

	useEffect(() => {
		let unsubscribe: any
		const setUserData = async () => {
			unsubscribe = await auth.onAuthStateChanged(async userAuth => {
				if (userAuth) {
					const userRef = await createUserProfileDocument(userAuth);
					userRef!.onSnapshot(snapshot => {
						const newUser = {
							uid: snapshot.id,
							...snapshot.data(),
						};
						console.log(newUser, "from userprodiver");
						setUser(newUser);
					});
				}
				setUser(null);
			});
		};
		setUserData();
		return () => {
			unsubscribe();
		};
	}, []);

	return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export default UserProvider;
