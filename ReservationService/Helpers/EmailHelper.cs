using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Threading.Tasks;

namespace ReservationService.Helpers
{
    public class EmailHelper
    {
        public static void SendEmail(string toAddress, string subject, string body)
        {
            try
            {
                MailMessage mail = new MailMessage("notificationsafefly@gmail.com", toAddress);
                SmtpClient SmtpServer = new SmtpClient("smtp.gmail.com");

                mail.Subject = subject;
                mail.Body = body;
                mail.IsBodyHtml = true;
                SmtpServer.Port = 587;
                SmtpServer.Credentials = new System.Net.NetworkCredential("notificationsafefly@gmail.com", "safefly2020");
                SmtpServer.EnableSsl = true;
                SmtpServer.Send(mail);
            }
            catch (Exception ex)
            {
                
            }
        }
    }
}
