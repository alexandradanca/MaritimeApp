using System.Diagnostics.Metrics;
using Microsoft.EntityFrameworkCore;
using WebAPI.Models;

namespace WebAPI.Data
{
    public class ApplicationDbContext: DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options): base(options) { }

        public DbSet<Ship> Ships { get; set; }
        public DbSet<Port> Ports { get; set; }
        public DbSet<Country> Countries { get; set; }
        public DbSet<Voyage> Voyages { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // One-to-many: Country → Ports
            modelBuilder.Entity<Country>()
                .HasMany(c => c.Ports)
                .WithOne(p => p.Country)
                .HasForeignKey(p => p.Id_Country)
                .OnDelete(DeleteBehavior.Restrict);

            // One-to-many: Ship → Voyages
            modelBuilder.Entity<Ship>()
                .HasMany(s => s.Voyages)
                .WithOne(v => v.Ship)
                .HasForeignKey(v => v.Id_Ship)
                .OnDelete(DeleteBehavior.Restrict);

            // One-to-many: Port → Departure Voyages
            modelBuilder.Entity<Port>()
                .HasMany(p => p.DepartingVoyages)
                .WithOne(v => v.DeparturePort)
                .HasForeignKey(v => v.Id_DeparturePort)
                .OnDelete(DeleteBehavior.Restrict);

            // One-to-many: Port → Arrival Voyages
            modelBuilder.Entity<Port>()
                .HasMany(p => p.ArrivingVoyages)
                .WithOne(v => v.ArrivalPort)
                .HasForeignKey(v => v.Id_ArrivalPort)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
