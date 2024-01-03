namespace TenantManagementSystem
{
    public class SalaryRecordRequest
    {
        public int EmployeeId { get; set; } // Assuming EmployeeId is provided
        public string SalaryMonth { get; set; }
        public int Salary { get; set; }
        public decimal Leaves { get; set; }
        public int Deductions { get; set; }
        public int NetPay { get; set; }
    }
}
