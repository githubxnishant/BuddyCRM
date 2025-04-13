// pages/login.jsx
import AuthForm from "../components/AuthForm";

export default function LoginPage() {
    return (
        <AuthForm
            title="Welcome back"
            subtitle="Login with your Google account"
            buttonText="Login"
            bottomText="Don't have an account?"
            linkText={{ label: "Sign up", href: "/signup" }}
            onSubmit={(e) => {
                e.preventDefault();
                console.log("Login submitted");
            }}
        />
    );
}
