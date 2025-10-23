using System;
using System.Collections.Generic;

namespace Udemy.Models;

public partial class Payment
{
    public int PaymentId { get; set; }

    public string? PurchaseId { get; set; }

    public decimal PaymentAmount { get; set; }

    public DateTime PaymentDateTime { get; set; }   

    public string? PaymentStatus { get; set; }

    public string? PaymentMode { get; set; }

    public int? CreatedBy { get; set; }

    public int? ModifiedBy { get; set; }

    public DateTime? CreatedDate { get; set; }

    public DateTime? ModifiedDate { get; set; }

    public int? Uid { get; set; }

    public virtual User? CreatedByNavigation { get; set; }

    public virtual User? ModifiedByNavigation { get; set; }

    public virtual User? UidNavigation { get; set; }
}
