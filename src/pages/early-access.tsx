import clsx from 'clsx';
import { NextPage } from 'next';
import Head from 'next/head';
import { FormEvent, useState } from 'react';

import Button from '$base/Button';
import Checkbox from '$base/Checkbox';
import Textfield from '$base/Textfield';
import Navbar from '$components/navbar/Navbar';
import Socials from '$components/navbar/Socials';
import { useLocalStorage } from '$hooks/useLocalStorage';

export type EarlyAccessFormProps = {
	name: string;
	email: string;
	available?: boolean;
	subscribed?: boolean;
};

const EarlyAccessPage: NextPage = () => {
	const [userName, setUserName] = useLocalStorage<string | null>(
		'user_name',
		null,
	);

	const [isSubmitting, setIsSubmitting] = useState(false);
	const [hasSubmitted, setHasSubmitted] = useState(false);

	async function onSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		if (isSubmitting) return;

		setIsSubmitting(true);

		const formData = new FormData(e.target as HTMLFormElement);
		const formProps = Object.fromEntries(
			formData,
		) as unknown as EarlyAccessFormProps;

		try {
			await fetch('/api/early-access', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(formProps),
			});

			setUserName(formProps.name);
			setHasSubmitted(true);
			setIsSubmitting(false);
			plausible('Early Access', {
				props: {
					Success: true,
					Subscribed: formProps.subscribed ? true : false,
					Available: formProps.available ? true : false,
				},
			});
		} catch (err) {
			plausible('Early Access', { props: { Success: false } });
			// console.log(err)
			alert('Failed to submit early access form. Please try again.');
		}
	}

	return (
		<>
			<Head>
				<title>Early Access | Vidstack</title>
				<meta
					name="description"
					content="Video for frontend developers and teams. Apply for early access!"
				/>
				<meta
					key="twitter:title"
					name="twitter:title"
					content="Video for frontend developers and teams. Apply for early access!"
				/>
				<meta
					key="og:title"
					property="og:title"
					content="Video for frontend developers and teams. Apply for early access!"
				/>
			</Head>

			<Navbar />

			<main className="flex flex-col min-w-full justify-center items-center pt-16 px-4">
				<h1 className="text-primary font-bold text-4xl 992:text-6xl tracking-tight text-center mt-4 992:mt-20 relative w-full">
					{!hasSubmitted ? 'Get Early Access' : 'Woohoo'}
				</h1>
				<p className="mt-10 text-center max-w-2xl mx-auto text-lg 576:text-xl tracking-wide text-subtitle">
					{!hasSubmitted ? (
						<span>
							We&apos;re thrilled you want to join our early access program 🤩
							By signing up, you&apos;ll be at the front of the queue to try
							Vidstack as soon as it&apos;s ready!
						</span>
					) : (
						<span>
							Welcome aboard, {userName}! Super excited to have you join our
							early access program 🎉 We&apos;re working hard on getting the
							initial product ready for you! In the meantime, if you&apos;d like
							to support us at this early stage you can:
						</span>
					)}
				</p>
				{hasSubmitted && (
					<Socials
						className="w-full flex flex-col items-center justify-center mt-20 space-y-8"
						iconClassName="w-7 h-7"
						customMessages={{
							github: 'Star us on Github',
							twitter: 'Follow us on Twitter',
							discord: 'Join us on Discord',
						}}
					/>
				)}
				{!hasSubmitted && (
					<form
						className="px-2 my-20 w-full flex flex-col max-w-lg"
						onSubmit={onSubmit}
					>
						<Textfield name="name" label="Name" required />
						<Textfield
							name="email"
							label="Email"
							type="email"
							className="mt-10"
							required
						/>
						<Checkbox
							name="subscribed"
							label="I'd love to receive updates via email on how Vidstack is progressing."
							className="mt-12"
						/>
						<Checkbox
							name="available"
							label="I'm happy for the Vidstack team to schedule a conversation with me to learn about how I'm using video."
							className="mt-12"
						/>
						<Button
							type="submit"
							contained
							icon={!isSubmitting ? 'arrow' : 'spinner'}
							className="mt-16"
						>
							Get Early Access
						</Button>
					</form>
				)}
			</main>

			<footer className="text-center w-full text-base font-medium pb-16 mt-40 text-subtitle">
				© Vidstack {new Date().getFullYear()}
			</footer>
		</>
	);
};

export default EarlyAccessPage;
