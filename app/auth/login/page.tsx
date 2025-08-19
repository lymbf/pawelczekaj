import {LoginForm} from "@/components/login-form";
import {Message} from "@/components/form-message";

export default async function Page(props: { searchParams: Promise<Message> }) {
    const searchParams = await props.searchParams;

    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
                <LoginForm message={searchParams}/>
            </div>
        </div>
    );
}
