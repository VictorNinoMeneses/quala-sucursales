using System.ComponentModel.DataAnnotations;

namespace QualaApi.Domain.Entities;

public class Sucursal
{
    [Required]
    public int Codigo { get; set; }

    [Required]
    [MaxLength(250)]
    public string Descripcion { get; set; } = string.Empty;

    [Required]
    [MaxLength(250)]
    public string Direccion { get; set; } = string.Empty;

    [Required]
    [MaxLength(50)]
    public string Identificacion { get; set; } = string.Empty;

    [Required]
    [DataType(DataType.Date)]
    public DateTime FechaCreacion { get; set; }

    [Required]
    [MaxLength(10)]
    public string Moneda { get; set; } = string.Empty;
}
