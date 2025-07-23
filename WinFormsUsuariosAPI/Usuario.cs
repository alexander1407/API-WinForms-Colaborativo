using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WinFormsUsuariosAPI
{
    public class Usuario
    {
        public int id { get; set; }
        public string nombre { get; set; }
        public string apellidos { get; set; }
        public string email { get; set; }
        public string sexo { get; set; }
    }

}
public class ApiResponse<T>
{
    public T data { get; set; }
}

public class ApiResponseSingle<T>
{
    public T data { get; set; }
}
