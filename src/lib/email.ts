interface EmailOptions {
  to: string
  subject: string
  html: string
}

// TODO: Replace console.log with Resend/SMTP when credentials are provided
async function sendEmail(options: EmailOptions): Promise<void> {
  if (process.env.NODE_ENV === 'development' || !process.env.EMAIL_FROM) {
    console.log('[EMAIL] To:', options.to)
    console.log('[EMAIL] Subject:', options.subject)
    console.log('[EMAIL] Body:', options.html)
    return
  }
  // Future: integrate Resend or nodemailer here
}

export async function sendPasswordResetEmail(
  email: string,
  resetUrl: string
): Promise<void> {
  await sendEmail({
    to: email,
    subject: 'Reset Your Password — Academica Institute',
    html: `<h1>Reset Your Password</h1><p>Click below to reset your password (expires in 1 hour):</p><a href="${resetUrl}">${resetUrl}</a>`,
  })
}
