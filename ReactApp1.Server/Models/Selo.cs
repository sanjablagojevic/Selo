namespace ReactApp1.Server.Models
{
    public class Selo
    {
        public int Id { get; set; }
        public string Naziv { get; set; }
        public string Drzava { get; set; }
        public string Lokacija { get; set; }
        public string OvlasceniKorisnik { get; set; }
        public List<Novost> Novosti { get; set; }

    }
}
