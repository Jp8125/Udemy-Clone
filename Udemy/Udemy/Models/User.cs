using System;
using System.Collections.Generic;

namespace Udemy.Models;

public partial class User
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string PhonNo { get; set; } = null!;

    public string PasswordHash { get; set; } = null!;

    public string PasswordSalt { get; set; } = null!;

    public int RoleId { get; set; }

    public int? CreatedBy { get; set; }

    public int? ModifiedBy { get; set; }

    public DateTime? CreatedDate { get; set; }

    public DateTime? ModifiedDate { get; set; }

    public string? ProfileUrl { get; set; }

    public virtual ICollection<Cart> Carts { get; set; } = new List<Cart>();

    public virtual ICollection<Category> CategoryCreatedByNavigations { get; set; } = new List<Category>();

    public virtual ICollection<Category> CategoryModifiedByNavigations { get; set; } = new List<Category>();

    public virtual ICollection<Course> CourseCreatedByNavigations { get; set; } = new List<Course>();

    public virtual ICollection<Course> CourseModifiedByNavigations { get; set; } = new List<Course>();

    public virtual User? CreatedByNavigation { get; set; }

    public virtual ICollection<User> InverseCreatedByNavigation { get; set; } = new List<User>();

    public virtual ICollection<User> InverseModifiedByNavigation { get; set; } = new List<User>();

    public virtual ICollection<MediaResource> MediaResourceCreatedByNavigations { get; set; } = new List<MediaResource>();

    public virtual ICollection<MediaResource> MediaResourceModifiedByNavigations { get; set; } = new List<MediaResource>();

    public virtual User? ModifiedByNavigation { get; set; }

    public virtual ICollection<Object> ObjectCreatedByNavigations { get; set; } = new List<Object>();

    public virtual ICollection<Object> ObjectModifiedByNavigations { get; set; } = new List<Object>();

    public virtual ICollection<Otp> Otps { get; set; } = new List<Otp>();

    public virtual ICollection<Payment> PaymentCreatedByNavigations { get; set; } = new List<Payment>();

    public virtual ICollection<Payment> PaymentModifiedByNavigations { get; set; } = new List<Payment>();

    public virtual ICollection<Payment> PaymentUidNavigations { get; set; } = new List<Payment>();

    public virtual ICollection<Progress> ProgressCreatedByNavigations { get; set; } = new List<Progress>();

    public virtual ICollection<Progress> ProgressModifiedByNavigations { get; set; } = new List<Progress>();

    public virtual ICollection<Progress> ProgressUidNavigations { get; set; } = new List<Progress>();

    public virtual ICollection<Purchase> PurchaseCreatedByNavigations { get; set; } = new List<Purchase>();

    public virtual ICollection<PurchaseItem> PurchaseItemCreatedByNavigations { get; set; } = new List<PurchaseItem>();

    public virtual ICollection<PurchaseItem> PurchaseItemModifiedByNavigations { get; set; } = new List<PurchaseItem>();

    public virtual ICollection<Purchase> PurchaseModifiedByNavigations { get; set; } = new List<Purchase>();

    public virtual ICollection<Purchase> PurchaseUsers { get; set; } = new List<Purchase>();

    public virtual Role Role { get; set; } = null!;

    public virtual ICollection<SubTopic> SubTopicCreatedByNavigations { get; set; } = new List<SubTopic>();

    public virtual ICollection<SubTopic> SubTopicModifiedByNavigations { get; set; } = new List<SubTopic>();

    public virtual ICollection<Topic> TopicCreatedByNavigations { get; set; } = new List<Topic>();

    public virtual ICollection<Topic> TopicModifiedByNavigations { get; set; } = new List<Topic>();

    public virtual ICollection<Type> TypeCreatedByNavigations { get; set; } = new List<Type>();

    public virtual ICollection<Type> TypeModifiedByNavigations { get; set; } = new List<Type>();
}
