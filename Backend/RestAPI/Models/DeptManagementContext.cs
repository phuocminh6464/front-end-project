using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace RestAPI.Models
{
    public partial class DeptManagementContext : DbContext
    {
        public DeptManagementContext()
        {
        }

        public DeptManagementContext(DbContextOptions<DeptManagementContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Account> Account { get; set; }
        public virtual DbSet<Department> Department { get; set; }
        public virtual DbSet<Employee> Employee { get; set; }
        public virtual DbSet<Salary> Salary { get; set; }
        public virtual DbSet<WorkOn> WorkOn { get; set; }

        

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Account>(entity =>
            {
                entity.HasKey(e => e.UserName);

                entity.ToTable("ACCOUNT");

                entity.Property(e => e.UserName)
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .ValueGeneratedNever();

                entity.Property(e => e.Pass)
                    .HasMaxLength(15)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Department>(entity =>
            {
                entity.HasKey(e => e.DeptId);

                entity.ToTable("DEPARTMENT");

                entity.Property(e => e.DeptId).HasColumnName("DeptID");

                entity.Property(e => e.DeptManagerId).HasColumnName("DeptManagerID");

                entity.Property(e => e.DeptName)
                    .IsRequired()
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<Employee>(entity =>
            {
                entity.HasKey(e => e.EmpId);

                entity.ToTable("EMPLOYEE");

                entity.Property(e => e.Address).HasColumnType("text");

                entity.Property(e => e.DateOfBirth).HasColumnType("date");

                entity.Property(e => e.EmpName)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.Phone)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.Sex)
                    .HasMaxLength(10)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Salary>(entity =>
            {
                entity.HasKey(e => e.EmpId);

                entity.ToTable("SALARY");

                entity.Property(e => e.EmpId).ValueGeneratedNever();

                entity.Property(e => e.Allowance).HasColumnType("decimal(10, 2)");

                entity.Property(e => e.DayOff).HasColumnType("int");

                entity.Property(e => e.SalaryMonth)
                    .HasColumnName("Salary")
                    .HasColumnType("decimal(10, 2)");

                entity.HasOne(d => d.Emp)
                    .WithOne(p => p.Salary)
                    .HasForeignKey<Salary>(d => d.EmpId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Salary");
            });

            modelBuilder.Entity<WorkOn>(entity =>
            {
                entity.HasKey(e => new { e.EmpId, e.DeptId });                

                entity.ToTable("WORK_ON");

                entity.Property(e => e.DeptId).HasColumnName("DeptID");

                entity.Property(e => e.Position).HasMaxLength(15);

                entity.HasOne(d => d.Dept)
                    .WithMany(p => p.WorkOn)
                    .HasForeignKey(d => d.DeptId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_DepId");

                entity.HasOne(d => d.Emp)
                    .WithMany(p => p.WorkOn)
                    .HasForeignKey(d => d.EmpId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_EmpId");
            });
        }
    }
}
