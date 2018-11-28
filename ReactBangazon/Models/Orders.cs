﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bangazon.Models
{
    public class Orders
    {
        public int Id { get; set; }
        public int CustomerId { get; set; }
        public int PaymentTypeId { get; set; }
        public List<OrderLines> Products = new List<OrderLines>();
    }
}
