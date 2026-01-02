# **App Name**: PimpAdvisor

## Core Features:

- Persona Selection: Allow users to choose between 'Rich Pimp' and 'Poor Pimp' personas, which tailors the advice given.
- AI-Powered Advice: Provide advice based on user questions, using the selected persona to guide the AI's responses.  Uses the 'claude-haiku-4-5-20251001' LLM tool through the Anthropic API.
- Payment Processing: Process payments via Stripe before providing advice.
- Dynamic Theme Switching: The user interface dynamically changes based on the selected persona, providing a visual distinction between 'Rich Pimp' and 'Poor Pimp'.
- Loading State: Indicate when the AI is processing the question with a loading animation.
- Error Handling: Display error messages to the user in case of payment failure or other issues.

## Style Guidelines:

- Primary color: Gold (#FFD700) for the 'Rich Pimp' persona to evoke luxury and wealth. Cyan (#00FFFF) for the 'Poor Pimp' persona to convey resourcefulness.
- Background color: Very dark gray (#121212) for both personas, providing a neutral backdrop to emphasize content and the call to action.
- Accent color: A vibrant yellow-orange (#FFB347) for the 'Rich Pimp', adding a touch of extravagance. A brighter, slightly desaturated cyan (#7FFFD4) for 'Poor Pimp', to offer contrast to the cool tones.
- Headline font: 'Playfair', a serif typeface to convey sophistication and a high-end feel, especially suitable for the 'Rich Pimp'.  Use 'PT Sans' as the body font, a modern, neutral font for readability.
- Body font: 'PT Sans', a humanist sans-serif for a blend of modernity and approachability. To be used with Playfair as the headline font.
- Use elegant, minimalist icons for the 'Rich Pimp', and more utilitarian, straightforward icons for the 'Poor Pimp'.
- Subtle animations for loading states and transitions, with smoother, more refined animations for the 'Rich Pimp' and snappier animations for the 'Poor Pimp'.