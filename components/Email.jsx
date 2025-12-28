'use client'

export default function Email() {
    return (
        <form className="email-signup" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="email" className="sr-only">Email Address</label>
            <input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="email-input"
                required
            />
            <button type="submit" className="email-button">
                Sign Up
            </button>
        </form>
    )
}
