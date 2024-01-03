using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SharedUtilities
{
    public class CouponCodeGenerator
    {
        private static Random random = new Random();
        public static string GenerateCouponCode(int length)
        {
            const string characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            char[] code = new char[length];

            for (int i = 0; i < length; i++)
            {
                code[i] = characters[random.Next(0, characters.Length)];
            }

            return new string(code);
        }
    }
}
