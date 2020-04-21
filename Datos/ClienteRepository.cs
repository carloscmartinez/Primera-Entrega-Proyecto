using Entity;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;

namespace Datos
{
    public class ClienteRepository
    {
        private readonly SqlConnection _connection;
        private readonly List<Cliente> _clientes = new List<Cliente>();
        public ClienteRepository(ConnectionManager connection)
        {
            _connection = connection._conexion;
        }
        public void Guardar(Cliente cliente)
        {
            using (var command = _connection.CreateCommand())
            {
                command.CommandText = @"Insert Into Cliente (Cedula,Nombre,Telefono) 
                                        values (@Cedula,@Nombre,@Telefono)";
                command.Parameters.AddWithValue("@Cedula", cliente.Cedula);
                command.Parameters.AddWithValue("@Nombre", cliente.Nombre);
                command.Parameters.AddWithValue("@Telefono", cliente.Telefono);
                var filas = command.ExecuteNonQuery();
            }
        }
        /*public void Eliminar(Persona persona)
        {
            using (var command = _connection.CreateCommand())
            {
                command.CommandText = "Delete from persona where Identificacion=@Identificacion";
                command.Parameters.AddWithValue("@Identificacion", persona.Identificacion);
                command.ExecuteNonQuery();
            }
        }*/
        public List<Cliente> ConsultarTodos()
        {
            SqlDataReader dataReader;
            List<Cliente> clientes = new List<Cliente>();
            using (var command = _connection.CreateCommand())
            {
                command.CommandText = "Select * from cliente ";
                dataReader = command.ExecuteReader();
                if (dataReader.HasRows)
                {
                    while (dataReader.Read())
                    {
                        Cliente cliente = DataReaderMapToCliente(dataReader);
                        clientes.Add(cliente);
                    }
                }
            }
            return clientes;
        }

        private Cliente DataReaderMapToCliente(SqlDataReader dataReader)
        {
            if(!dataReader.HasRows) return null;
            Cliente cliente = new Cliente();
            cliente.Cedula = (string)dataReader["Cedula"];
            cliente.Nombre = (string)dataReader["Nombre"];
            cliente.Telefono = (string)dataReader["Telefono"]; 
            return cliente;
        }

        public Cliente BuscarPorIdentificacion(string cedula)
        {
            SqlDataReader dataReader;
            using (var command = _connection.CreateCommand())
            {
                command.CommandText = "select * from cliente where Cedula=@Cedula";
                command.Parameters.AddWithValue("@Cedula", cedula);
                dataReader = command.ExecuteReader();
                dataReader.Read();
                return DataReaderMapToCliente(dataReader);
            }
        }
    }
}