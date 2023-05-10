import { Typography, Container } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import Grid from '@mui/material/Unstable_Grid2'
import Footer from '../components/Footer'

import { AuthProvider, useAuth } from "react-oidc-context";

const oidcConfig = {
    authority: "https://zk-oidc.vercel.app/oidc",
    client_id: "0xf9a3cce444b65927a9dd225d6731b341",
    redirect_uri: process.env.NEXT_PUBLIC_PRODUCTION_URL ? process.env.NEXT_PUBLIC_PRODUCTION_URL : "http://localhost:3000",
    scope: 'openid email profile'
};

function Home() {
    const auth = useAuth();

    return (
        <Container style={{marginTop: '2em'}}>
                <div>
                    <Container maxWidth="lg">
                        <Grid container direction="column" spacing={3} alignItems="center" justifyContent="center">
                        <Grid item>
                            <Typography variant="h3" textAlign="center" fontWeight="700">Simple OIDC Login</Typography>
                        </Grid>

                        {auth.error && 
                                <Grid item>
                                    Error: 
                                    <pre>
                                        {JSON.stringify(auth.error, null, 2)}
                                    </pre>
                                </Grid>
                            }
                            {auth.isAuthenticated && 
                                <Grid item>
                                    Authentication info:
                                    <pre>
                                        {JSON.stringify(auth.user.profile, null, 2)}
                                    </pre>
                                </Grid>
                            }
                            <Grid item>
                                 {
                                    !auth.isAuthenticated ?
                                    <LoadingButton variant="contained" loading={auth.isLoading} onClick={() => void auth.signinRedirect()}>Login with OIDC</LoadingButton> :
                                    <LoadingButton variant="contained" loading={auth.isLoading} onClick={() => void auth.removeUser()}>Logout</LoadingButton>
                                 }
                            </Grid>
                        </Grid>
                    </Container>
                </div>
            <Footer/>
        </Container>
    )
}

export default function AuthHome() {
    return <AuthProvider {...oidcConfig}>
        <Home/>
    </AuthProvider>
}
