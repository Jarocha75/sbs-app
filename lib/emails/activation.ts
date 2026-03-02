interface ActivationEmailOptions {
  activationUrl: string
  courseTitle: string
}

export function buildActivationEmail({ activationUrl, courseTitle }: ActivationEmailOptions): {
  subject: string
  html: string
} {
  return {
    subject: 'Aktivujte svoj účet – SBS Akademia',
    html: `<!DOCTYPE html>
<html lang="sk">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Aktivácia účtu</title>
</head>
<body style="margin:0;padding:0;background:#f0f4f8;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f4f8;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td style="background:#1e3a5f;padding:32px 40px;text-align:center;">
              <h1 style="margin:0;color:#c9a84c;font-size:22px;font-weight:bold;letter-spacing:1px;">
                SBS Akademia
              </h1>
              <p style="margin:8px 0 0;color:#cbd5e1;font-size:13px;">
                Príprava na preukaz S a P
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px 40px 32px;">
              <h2 style="margin:0 0 16px;color:#1e3a5f;font-size:20px;">
                Vitajte v SBS Akademia!
              </h2>
              <p style="margin:0 0 12px;color:#374151;font-size:15px;line-height:1.6;">
                Ďakujeme za zakúpenie kurzu <strong>${courseTitle}</strong>.
                Vaša platba bola úspešne spracovaná.
              </p>
              <p style="margin:0 0 24px;color:#374151;font-size:15px;line-height:1.6;">
                Pre aktiváciu vášho účtu kliknite na tlačidlo nižšie a nastavte si heslo.
                Odkaz je platný <strong>48 hodín</strong>.
              </p>

              <!-- CTA Button -->
              <table cellpadding="0" cellspacing="0" style="margin:0 auto 32px;">
                <tr>
                  <td style="background:#c9a84c;border-radius:8px;padding:0;">
                    <a href="${activationUrl}"
                       style="display:inline-block;padding:14px 32px;color:#1e3a5f;font-size:15px;font-weight:bold;text-decoration:none;letter-spacing:0.5px;">
                      Aktivovať účet
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 8px;color:#6b7280;font-size:13px;">
                Ak tlačidlo nefunguje, skopírujte nasledujúci odkaz do prehliadača:
              </p>
              <p style="margin:0;font-size:12px;word-break:break-all;">
                <a href="${activationUrl}" style="color:#1e3a5f;">${activationUrl}</a>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f8fafc;padding:24px 40px;border-top:1px solid #e2e8f0;">
              <p style="margin:0;color:#9ca3af;font-size:12px;text-align:center;line-height:1.6;">
                Tento email bol odoslaný automaticky. Ak ste si kurz nezakúpili,
                môžete tento email ignorovať.<br />
                © 2026 SBS Akademia. Všetky práva vyhradené.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`,
  }
}
