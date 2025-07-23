using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Json;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace WinFormsUsuariosAPI
{
    public partial class Form1 : Form
    {
        private readonly HttpClient _httpClient = new HttpClient();
        private int? selectedUserId = null;

        public Form1()
        {
            InitializeComponent();
        }

        private void EstilizarDataGridView()
        {
            dataGridView1.EnableHeadersVisualStyles = false;
            dataGridView1.ColumnHeadersDefaultCellStyle.BackColor = Color.DarkSlateBlue;
            dataGridView1.ColumnHeadersDefaultCellStyle.ForeColor = Color.White;
            dataGridView1.ColumnHeadersDefaultCellStyle.Font = new Font("Segoe UI", 10, FontStyle.Bold);
            dataGridView1.ColumnHeadersDefaultCellStyle.Alignment = DataGridViewContentAlignment.MiddleCenter;

            dataGridView1.DefaultCellStyle.BackColor = Color.White;
            dataGridView1.DefaultCellStyle.ForeColor = Color.Black;
            dataGridView1.DefaultCellStyle.Font = new Font("Segoe UI", 9);
            dataGridView1.DefaultCellStyle.SelectionBackColor = Color.SteelBlue;
            dataGridView1.DefaultCellStyle.SelectionForeColor = Color.White;

            dataGridView1.AlternatingRowsDefaultCellStyle.BackColor = Color.LightGray;

            dataGridView1.SelectionMode = DataGridViewSelectionMode.FullRowSelect;
            dataGridView1.MultiSelect = false;
            dataGridView1.ReadOnly = true;
            dataGridView1.AllowUserToAddRows = false;
            dataGridView1.AllowUserToDeleteRows = false;
            dataGridView1.RowHeadersVisible = false;
            dataGridView1.CellBorderStyle = DataGridViewCellBorderStyle.SingleHorizontal;
            dataGridView1.GridColor = Color.LightGray;
            dataGridView1.AutoSizeColumnsMode = DataGridViewAutoSizeColumnsMode.Fill;
        }


        private void InicializarComboBoxSexo()
        {
            cmbSexo.Items.Clear();
            cmbSexo.Items.Add("M");
            cmbSexo.Items.Add("F");
            cmbSexo.SelectedIndex = 0;
        }

        private async void Form1_Load(object sender, EventArgs e)
        {
            InicializarComboBoxSexo();
            await LoadUsuarios();
            EstilizarDataGridView();
        }

        private async Task LoadUsuarios()
        {
            try
            {
                var response = await _httpClient.GetFromJsonAsync<ApiResponse<List<Usuario>>>("http://localhost:3000/api/usuarios");
                dataGridView1.DataSource = response.data;
            }
            catch (Exception ex)
            {
                MessageBox.Show("Error al cargar usuarios: " + ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        private bool ValidarCampos()
        {
            if (string.IsNullOrWhiteSpace(txtNombre.Text) ||
                string.IsNullOrWhiteSpace(txtApellidos.Text) ||
                string.IsNullOrWhiteSpace(txtEmail.Text) ||
                cmbSexo.SelectedItem == null)
            {
                MessageBox.Show("Por favor completa todos los campos.", "Campos requeridos", MessageBoxButtons.OK, MessageBoxIcon.Warning);
                return false;
            }
            return true;
        }

        private async void btnAgregar_Click(object sender, EventArgs e)
        {
            if (!ValidarCampos()) return;

            var usuario = new Usuario
            {
                nombre = txtNombre.Text,
                apellidos = txtApellidos.Text,
                email = txtEmail.Text,
                sexo = cmbSexo.SelectedItem.ToString()
            };

            progressBarCarga.Visible = true;
            lblEstado.Text = "Registrando ciudadano...";
            lblEstado.Visible = true;
            btnAgregar.Enabled = false;

            bool exito = false;

            try
            {
                var response = await _httpClient.PostAsJsonAsync("http://localhost:3000/api/usuarios", usuario);

                if (response.IsSuccessStatusCode)
                {
                    await LoadUsuarios();
                    ClearForm();
                    exito = true;
                }
                else
                {
                    MessageBox.Show("Error al registrar ciudadano.", "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show("Error de conexión: " + ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
            finally
            {
                lblEstado.Text = "Registro completado";
                await Task.Delay(1000);

                progressBarCarga.Visible = false;
                lblEstado.Visible = false;
                lblEstado.Text = "";
                btnAgregar.Enabled = true;

                // 👉 Mostrar el mensaje de éxito *después* de ocultar la barra
                if (exito)
                {
                    MessageBox.Show("Ciudadano registrado con éxito.", "Registro exitoso", MessageBoxButtons.OK, MessageBoxIcon.Information);
                }
            }
        }

        private async void btnModificar_Click(object sender, EventArgs e)
        {
            if (selectedUserId == null)
            {
                MessageBox.Show("Debes seleccionar un ciudadano para modificar.", "Advertencia", MessageBoxButtons.OK, MessageBoxIcon.Warning);
                return;
            }

            if (!ValidarCampos()) return;

            var usuario = new Usuario
            {
                nombre = txtNombre.Text,
                apellidos = txtApellidos.Text,
                email = txtEmail.Text,
                sexo = cmbSexo.SelectedItem.ToString()
            };

            progressBarCarga.Visible = true;
            lblEstado.Text = "Modificando ciudadano...";
            lblEstado.Visible = true;
            btnModificar.Enabled = false;

            bool exito = false;

            try
            {
                var response = await _httpClient.PutAsJsonAsync($"http://localhost:3000/api/usuarios/{selectedUserId}", usuario);

                if (response.IsSuccessStatusCode)
                {
                    await LoadUsuarios();
                    ClearForm();
                    exito = true;
                }
                else
                {
                    MessageBox.Show("Error al modificar ciudadano.", "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show("Error de conexión: " + ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
            finally
            {
                lblEstado.Text = "Modificación completada";
                await Task.Delay(2000);

                progressBarCarga.Visible = false;
                lblEstado.Visible = false;
                lblEstado.Text = "";
                btnModificar.Enabled = true;

                // Mensaje después de terminar el proceso visual
                if (exito)
                {
                    MessageBox.Show("Datos actualizados correctamente.", "Modificación exitosa", MessageBoxButtons.OK, MessageBoxIcon.Information);
                }
            }
        }


        private async void btnEliminar_Click(object sender, EventArgs e)
        {
            if (selectedUserId == null)
            {
                MessageBox.Show("Selecciona un ciudadano para eliminar.", "Advertencia", MessageBoxButtons.OK, MessageBoxIcon.Warning);
                return;
            }

            var confirm = MessageBox.Show("¿Estás seguro que deseas eliminar este ciudadano?", "Confirmar eliminación", MessageBoxButtons.YesNo, MessageBoxIcon.Question);
            if (confirm != DialogResult.Yes) return;

            progressBarCarga.Visible = true;
            lblEstado.Text = "Eliminando ciudadano...";
            lblEstado.Visible = true;
            btnEliminar.Enabled = false;

            try
            {
                var response = await _httpClient.DeleteAsync($"http://localhost:3000/api/usuarios/{selectedUserId}");

                if (response.IsSuccessStatusCode)
                {
                    MessageBox.Show("Ciudadano eliminado correctamente.", "Eliminación exitosa", MessageBoxButtons.OK, MessageBoxIcon.Information);
                    await LoadUsuarios();
                    ClearForm();
                }
                else
                {
                    MessageBox.Show("Error al eliminar ciudadano.", "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show("Error de conexión: " + ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
            finally
            {
                lblEstado.Text = "Eliminación completada";
                await Task.Delay(1000);

                progressBarCarga.Visible = false;
                lblEstado.Visible = false;
                lblEstado.Text = "";
                btnEliminar.Enabled = true;
            }
        }


        private void dataGridView1_SelectionChanged(object sender, EventArgs e)
        {
            if (dataGridView1.SelectedRows.Count > 0)
            {
                var usuario = (Usuario)dataGridView1.SelectedRows[0].DataBoundItem;
                selectedUserId = usuario.id;
                txtNombre.Text = usuario.nombre;
                txtApellidos.Text = usuario.apellidos;
                txtEmail.Text = usuario.email;
                cmbSexo.SelectedItem = usuario.sexo;
            }
        }

        private void ClearForm()
        {
            txtNombre.Clear();
            txtApellidos.Clear();
            txtEmail.Clear();
            cmbSexo.SelectedIndex = 0;
            txtBuscarId.Clear();
            selectedUserId = null;
        }

        private async void btnBuscar_Click(object sender, EventArgs e)
        {
            string valorBusqueda = txtBuscarId.Text.Trim();

            if (string.IsNullOrWhiteSpace(valorBusqueda))
            {
                MessageBox.Show("Por favor ingresa un ID, nombre o apellido.", "Campo vacío", MessageBoxButtons.OK, MessageBoxIcon.Warning);
                return;
            }

            progressBarCarga.Visible = true;
            lblEstado.Text = "Consultando API...";
            lblEstado.Visible = true;
            btnBuscar.Enabled = false;

            try
            {
                HttpResponseMessage response;

                if (int.TryParse(valorBusqueda, out int idBuscado))
                {
                    // Buscar por ID
                    response = await _httpClient.GetAsync($"http://localhost:3000/api/usuarios/{idBuscado}");

                    if (response.StatusCode == System.Net.HttpStatusCode.NotFound)
                    {
                        MessageBox.Show("Ciudadano no encontrado por ID.", "Sin resultados", MessageBoxButtons.OK, MessageBoxIcon.Information);
                        ClearForm();
                        dataGridView1.DataSource = null;  // Limpia el grid
                        return;
                    }

                    if (!response.IsSuccessStatusCode)
                    {
                        MessageBox.Show("Error al buscar ciudadano por ID.", "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                        return;
                    }

                    var result = await response.Content.ReadFromJsonAsync<ApiResponse<List<Usuario>>>();
                    var usuario = result.data.FirstOrDefault();

                    if (usuario != null)
                    {
                        // Llena los textbox
                        txtNombre.Text = usuario.nombre;
                        txtApellidos.Text = usuario.apellidos;
                        txtEmail.Text = usuario.email;
                        cmbSexo.SelectedItem = usuario.sexo;
                        selectedUserId = usuario.id;

                        // Muestra el usuario en el DataGridView como lista con un solo elemento
                        dataGridView1.DataSource = new List<Usuario> { usuario };

                        MessageBox.Show("Ciudadano encontrado por ID.", "Búsqueda exitosa", MessageBoxButtons.OK, MessageBoxIcon.Information);
                    }
                }
                else
                {
                    // Buscar por nombre o apellidos
                    response = await _httpClient.GetAsync($"http://localhost:3000/api/usuarios?search={Uri.EscapeDataString(valorBusqueda)}");

                    if (!response.IsSuccessStatusCode)
                    {
                        MessageBox.Show("Error al buscar ciudadanos por nombre o apellido.", "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                        return;
                    }

                    var result = await response.Content.ReadFromJsonAsync<ApiResponse<List<Usuario>>>();
                    var usuarios = result.data;

                    if (usuarios.Count == 0)
                    {
                        MessageBox.Show("No se encontraron coincidencias por nombre o apellido.", "Sin resultados", MessageBoxButtons.OK, MessageBoxIcon.Information);
                        ClearForm();
                        dataGridView1.DataSource = null;  // Limpia el grid
                        return;
                    }

                    // Mostrar el primer usuario encontrado en los campos
                    var usuario = usuarios.First();
                    txtNombre.Text = usuario.nombre;
                    txtApellidos.Text = usuario.apellidos;
                    txtEmail.Text = usuario.email;
                    cmbSexo.SelectedItem = usuario.sexo;
                    selectedUserId = usuario.id;

                    // Mostrar todos en el DataGridView
                    dataGridView1.DataSource = usuarios;

                    MessageBox.Show($"Se encontró al menos un ciudadano por nombre/apellido.", "Búsqueda exitosa", MessageBoxButtons.OK, MessageBoxIcon.Information);
                }
            }
            catch (HttpRequestException httpEx)
            {
                MessageBox.Show("Error de conexión: " + httpEx.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
            catch (Exception ex)
            {
                MessageBox.Show("Error inesperado: " + ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
            finally
            {
                lblEstado.Text = "Consulta completada";
                await Task.Delay(2000);

                progressBarCarga.Visible = false;
                lblEstado.Visible = false;
                lblEstado.Text = "";
                btnBuscar.Enabled = true;
            }
        }

        private async void btnLimpiar_Click(object sender, EventArgs e)
        {
            await LoadUsuarios();

            // Retrasar la deselección hasta que el DataGridView termine de procesar el DataSource
            await Task.Delay(100); // Pequeño retraso para que termine el renderizado y selección automática
            dataGridView1.ClearSelection();

            ClearForm();
            selectedUserId = null;
        }

    }
}
