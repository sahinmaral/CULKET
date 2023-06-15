using CULKET.Backend.Core.Models;

using Newtonsoft.Json;

using System.Net;
using System.Net.Mail;

namespace CULKET.Backend.Identity.Helpers
{
    public static class EmailConfirmationHelper
    {
        private static EmailServiceConfigurationModel AssignEmailConfigurationAndReturn()
        {
            string currentPath = Directory.GetCurrentDirectory();
            string newPath = Path.GetFullPath(Path.Combine(currentPath, @"..\CULKET.Backend.Identity\Constants\mailServiceConfiguration.json"));

            using (StreamReader r = new StreamReader(newPath))
            {
                string json = r.ReadToEnd();
                EmailServiceConfigurationModel config = JsonConvert.DeserializeObject<EmailServiceConfigurationModel>(json);
                return config;
            }
        }

        public async static Task EmailConfirmationSendEmail(string link, string email)
        {
            EmailServiceConfigurationModel config = AssignEmailConfigurationAndReturn();

            MailMessage mail = new MailMessage();

            var smtpClient = new SmtpClient(config.Host)
            {
                Port = config.Port,
                Credentials = new NetworkCredential(config.Email, config.Password),
                EnableSsl = config.IsSSLEnabled,
            };

            mail.From = new MailAddress(config.Email);
            mail.To.Add(email);

            mail.Subject = "CULKET::Email dogrulama";
            mail.Body = "<h2>Hesabinizi dogrulamak icin lutfen asagidaki linke tiklayiniz </h2><hr/>";
            mail.Body += $"<a href='{link}'>Hesap dogrulama linki</a>";
            mail.IsBodyHtml = true;

            await smtpClient.SendMailAsync(mail);

        }
    }
}
