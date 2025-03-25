/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { authWithGoogle } from "../../services/authApi";
import { useAuth } from "../../AuthContext";
                              

export default (props) => {
	const { user, handleLogin, handleLogout, userLoad, setUserLoad } = useAuth();
	
	const responseGoogle = async (authResult) => {
		try {
			setUserLoad(true);
			if (authResult["code"]) {
				console.log(authResult.code);
				const result = await authWithGoogle(authResult.code);
				handleLogin(result.data.data.user);
				console.log(result);
				
			} else {
				console.log(authResult);
				throw new Error(authResult);
			}
		} catch (e) {
			console.log(e);
		} finally {
			setUserLoad(false);
		}
	};

	const googleLogin = useGoogleLogin({
		onSuccess: responseGoogle,
		onError: responseGoogle,
		flow: "auth-code",
	});

	return (
		<button
			style={{
				padding: "10px 20px",
			}}
			onClick={googleLogin}
		>
			Sign in with Google
		</button>
	);
};