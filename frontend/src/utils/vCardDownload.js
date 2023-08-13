export const handleDownload = (user) => {
  console.log(user, 'handleDownload');
  const imageBase64 = user?.image?.split(',')[1];

  const occupations = user?.occupations
    .map(
      (occupation) =>
        `TITLE:${occupation.positionTitle}\nORG:${occupation.organizationName}`
    )
    .join('\n');
  const phoneNumbers = user?.phoneNumbers
    .map((phone) => `TEL;TYPE=${phone.type.toUpperCase()}:${phone.number}`)
    .join('\n');
  const socialLinks = user?.socialLinks
    .map(
      (social) =>
        `X-SOCIALPROFILE;TYPE=${social.type.toLowerCase()}:${social.link}`
    )
    .join('\n');
  const emails = user.emails
    .map((email) => `EMAIL:${email.emailInput}`)
    .join('\n');

  const vcard = `BEGIN:VCARD
VERSION:3.0
N:${user?.lastName};${user?.firstName}
${occupations}
${phoneNumbers}
${emails}
ADR:${user?.address}
NOTE:${user?.notes}
URL:${user?.website}
PHOTO;TYPE=JPEG;ENCODING=BASE64:${imageBase64}
${socialLinks}
END:VCARD`;

  const blob = new Blob([vcard], { type: 'text/vcard' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.download = `${user.firstName}_${user.lastName}.vcf`;
  link.click();
};
