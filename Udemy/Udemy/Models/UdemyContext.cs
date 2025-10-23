using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Udemy.Models;

public partial class UdemyContext : DbContext
{
    public UdemyContext()
    {
    }

    public UdemyContext(DbContextOptions<UdemyContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Cart> Carts { get; set; }

    public virtual DbSet<Category> Categories { get; set; }

    public virtual DbSet<Course> Courses { get; set; }

    public virtual DbSet<MediaResource> MediaResources { get; set; }

    public virtual DbSet<Object> Objects { get; set; }

    public virtual DbSet<Otp> Otps { get; set; }

    public virtual DbSet<Payment> Payments { get; set; }

    public virtual DbSet<Progress> Progresses { get; set; }

    public virtual DbSet<Purchase> Purchases { get; set; }

    public virtual DbSet<PurchaseItem> PurchaseItems { get; set; }

    public virtual DbSet<Role> Roles { get; set; }

    public virtual DbSet<SubTopic> SubTopics { get; set; }

    public virtual DbSet<Topic> Topics { get; set; }

    public virtual DbSet<Type> Types { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=PC0511\\MSSQL2019;Database=Udemy;Trusted_Connection=True;TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Cart>(entity =>
        {
            entity.HasKey(e => e.CartId).HasName("PK__Cart__51BCD7B7820C1827");

            entity.ToTable("Cart");

            entity.Property(e => e.CourseId).HasColumnName("CourseID");

            entity.HasOne(d => d.Course).WithMany(p => p.Carts)
                .HasForeignKey(d => d.CourseId)
                .HasConstraintName("FK__Cart__CourseID__3F466844");

            entity.HasOne(d => d.User).WithMany(p => p.Carts)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK__Cart__UserId__403A8C7D");
        });

        modelBuilder.Entity<Category>(entity =>
        {
            entity.HasKey(e => e.CategoryId).HasName("PK__Category__19093A0B586694D2");

            entity.ToTable("Category");

            entity.Property(e => e.CategoryName)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.ParentCategoryId).HasColumnName("parentCategoryID");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.CategoryCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .HasConstraintName("FK__Category__Create__412EB0B6");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.CategoryModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK__Category__Modifi__4222D4EF");

            entity.HasOne(d => d.ParentCategory).WithMany(p => p.InverseParentCategory)
                .HasForeignKey(d => d.ParentCategoryId)
                .HasConstraintName("FK__Category__parent__4316F928");
        });

        modelBuilder.Entity<Course>(entity =>
        {
            entity.HasKey(e => e.CourseId).HasName("PK__Course__C92D71A7E3C7064C");

            entity.ToTable("Course");

            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Description).IsUnicode(false);
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.Name)
                .HasMaxLength(200)
                .IsUnicode(false);
            entity.Property(e => e.Price).HasColumnType("decimal(18, 0)");
            entity.Property(e => e.ThumbnailSrc)
                .HasMaxLength(200)
                .IsUnicode(false);

            entity.HasOne(d => d.Category).WithMany(p => p.Courses)
                .HasForeignKey(d => d.CategoryId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Course__Category__440B1D61");

            entity.HasOne(d => d.CoursestatusNavigation).WithMany(p => p.Courses)
                .HasForeignKey(d => d.Coursestatus)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Course__Coursest__44FF419A");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.CourseCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .HasConstraintName("FK__Course__CreatedB__45F365D3");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.CourseModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK__Course__Modified__46E78A0C");
        });

        modelBuilder.Entity<MediaResource>(entity =>
        {
            entity.HasKey(e => e.MediaId).HasName("PK__MediaRes__B2C2B5CF676E7DB6");

            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.MediaSrc)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.MediaType)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.TopicId).HasColumnName("TopicID");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.MediaResourceCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .HasConstraintName("FK__MediaReso__Creat__47DBAE45");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.MediaResourceModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK__MediaReso__Modif__48CFD27E");

            entity.HasOne(d => d.Topic).WithMany(p => p.MediaResources)
                .HasForeignKey(d => d.TopicId)
                .HasConstraintName("FK__MediaReso__Topic__49C3F6B7");
        });

        modelBuilder.Entity<Object>(entity =>
        {
            entity.HasKey(e => e.ObjectId).HasName("PK__Objects__9A6192B1F23AE533");

            entity.Property(e => e.ObjectId).HasColumnName("ObjectID");
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.TypeId).HasColumnName("TypeID");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.ObjectCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .HasConstraintName("FK__Objects__Created__4AB81AF0");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.ObjectModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK__Objects__Modifie__4BAC3F29");

            entity.HasOne(d => d.Type).WithMany(p => p.Objects)
                .HasForeignKey(d => d.TypeId)
                .HasConstraintName("FK__Objects__TypeID__4CA06362");
        });

        modelBuilder.Entity<Otp>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Otp__3214EC078ADFE875");

            entity.ToTable("Otp");

            entity.Property(e => e.Otp1)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("Otp");
            entity.Property(e => e.Validtill).HasColumnType("datetime");

            entity.HasOne(d => d.User).WithMany(p => p.Otps)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK__Otp__UserId__4D94879B");
        });

        modelBuilder.Entity<Payment>(entity =>
        {
            entity.HasKey(e => e.PaymentId).HasName("PK__Payment__9B556A3874ABFDBC");

            entity.ToTable("Payment");

            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.PaymentAmount).HasColumnType("decimal(18, 0)");
            entity.Property(e => e.PaymentDateTime).HasColumnType("datetime");
            entity.Property(e => e.PaymentMode)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.PaymentStatus)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.PurchaseId)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("PurchaseID");
            entity.Property(e => e.Uid).HasColumnName("UId");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.PaymentCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .HasConstraintName("FK__Payment__Created__4E88ABD4");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.PaymentModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK__Payment__Modifie__4F7CD00D");

            entity.HasOne(d => d.UidNavigation).WithMany(p => p.PaymentUidNavigations)
                .HasForeignKey(d => d.Uid)
                .HasConstraintName("FK__Payment__UId__01142BA1");
        });

        modelBuilder.Entity<Progress>(entity =>
        {
            entity.HasKey(e => e.ProgressId).HasName("PK__Progress__BAE29CA54867A667");

            entity.ToTable("Progress");

            entity.Property(e => e.CourseId).HasColumnName("CourseID");
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.Uid).HasColumnName("UId");

            entity.HasOne(d => d.Course).WithMany(p => p.Progresses)
                .HasForeignKey(d => d.CourseId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Progress__Course__534D60F1");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.ProgressCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .HasConstraintName("FK__Progress__Create__5441852A");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.ProgressModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK__Progress__Modifi__5535A963");

            entity.HasOne(d => d.TopicsNavigation).WithMany(p => p.Progresses)
                .HasForeignKey(d => d.Topics)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Progress__Topics__5629CD9C");

            entity.HasOne(d => d.UidNavigation).WithMany(p => p.ProgressUidNavigations)
                .HasForeignKey(d => d.Uid)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Progress__UId__571DF1D5");
        });

        modelBuilder.Entity<Purchase>(entity =>
        {
            entity.HasKey(e => e.PurchaseId).HasName("PK__Purchase__6B0A6BBE7835886F");

            entity.ToTable("Purchase");

            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.PurchaseDate).HasColumnType("date");
            entity.Property(e => e.UserId).HasColumnName("UserID");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.PurchaseCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .HasConstraintName("FK__Purchase__Create__5812160E");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.PurchaseModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK__Purchase__Modifi__59063A47");

            entity.HasOne(d => d.User).WithMany(p => p.PurchaseUsers)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Purchase__UserID__59FA5E80");
        });

        modelBuilder.Entity<PurchaseItem>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Purchase__3214EC272C029CA4");

            entity.ToTable("PurchaseItem");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.CourseId).HasColumnName("CourseID");
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.PurchaseId).HasColumnName("PurchaseID");

            entity.HasOne(d => d.Course).WithMany(p => p.PurchaseItems)
                .HasForeignKey(d => d.CourseId)
                .HasConstraintName("FK__PurchaseI__Cours__5AEE82B9");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.PurchaseItemCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .HasConstraintName("FK__PurchaseI__Creat__5BE2A6F2");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.PurchaseItemModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK__PurchaseI__Modif__5CD6CB2B");

            entity.HasOne(d => d.Purchase).WithMany(p => p.PurchaseItems)
                .HasForeignKey(d => d.PurchaseId)
                .HasConstraintName("FK__PurchaseI__Purch__5DCAEF64");
        });

        modelBuilder.Entity<Role>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Role__3214EC07EBC3B37F");

            entity.ToTable("Role");

            entity.Property(e => e.Role1)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("Role");
        });

        modelBuilder.Entity<SubTopic>(entity =>
        {
            entity.HasKey(e => e.SubTopicId).HasName("PK__SubTopic__3EFE32F004CFBDB0");

            entity.Property(e => e.SubTopicId).HasColumnName("SubTopicID");
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Description).IsUnicode(false);
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.Title)
                .HasMaxLength(50)
                .IsUnicode(false);

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.SubTopicCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .HasConstraintName("FK__SubTopics__Creat__5EBF139D");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.SubTopicModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK__SubTopics__Modif__5FB337D6");

            entity.HasOne(d => d.Parent).WithMany(p => p.InverseParent)
                .HasForeignKey(d => d.ParentId)
                .HasConstraintName("FK__SubTopics__Paren__60A75C0F");

            entity.HasOne(d => d.TopicsNavigation).WithMany(p => p.SubTopics)
                .HasForeignKey(d => d.Topics)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__SubTopics__Topic__619B8048");
        });

        modelBuilder.Entity<Topic>(entity =>
        {
            entity.HasKey(e => e.TopicId).HasName("PK__Topics__022E0F5D32F9F212");

            entity.Property(e => e.CourseId).HasColumnName("CourseID");
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Description).IsUnicode(false);
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.Title)
                .HasMaxLength(50)
                .IsUnicode(false);

            entity.HasOne(d => d.Course).WithMany(p => p.Topics)
                .HasForeignKey(d => d.CourseId)
                .HasConstraintName("FK__Topics__CourseID__628FA481");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.TopicCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .HasConstraintName("FK__Topics__CreatedB__6383C8BA");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.TopicModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK__Topics__Modified__6477ECF3");
        });

        modelBuilder.Entity<Type>(entity =>
        {
            entity.HasKey(e => e.TypeId).HasName("PK__Types__516F03956D4DA027");

            entity.Property(e => e.TypeId).HasColumnName("TypeID");
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .IsUnicode(false);

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.TypeCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .HasConstraintName("FK__Types__CreatedBy__656C112C");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.TypeModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK__Types__ModifiedB__66603565");

            entity.HasOne(d => d.Parent).WithMany(p => p.InverseParent)
                .HasForeignKey(d => d.ParentId)
                .HasConstraintName("FK__Types__ParentId__6754599E");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__User__3214EC278816A5D0");

            entity.ToTable("User");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Email)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.PasswordHash).IsUnicode(false);
            entity.Property(e => e.PasswordSalt).IsUnicode(false);
            entity.Property(e => e.PhonNo)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.ProfileUrl).IsUnicode(false);

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.InverseCreatedByNavigation)
                .HasForeignKey(d => d.CreatedBy)
                .HasConstraintName("FK__User__CreatedBy__68487DD7");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.InverseModifiedByNavigation)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK__User__ModifiedBy__693CA210");

            entity.HasOne(d => d.Role).WithMany(p => p.Users)
                .HasForeignKey(d => d.RoleId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__User__RoleId__6A30C649");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
