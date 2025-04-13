// pages/signup.jsx
import AuthForm from "../components/AuthForm";

export default function SignupPage() {
    return (
        <AuthForm
            title="Join us today"
            subtitle="Sign up with your Google account"
            buttonText="Sign up"
            bottomText="Already have an account?"
            linkText={{ label: "Login", href: "/login" }}
            onSubmit={(e) => {
                e.preventDefault();
                console.log("Signup submitted");
            }}
        />
    );
}
