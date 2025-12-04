class Program {
    static int Square(int x) => x * x;

    static void Main(string[] args) {
        Console.WriteLine("C# Theme Test");

        for (int i = 0; i < 4; i++) {
            if (i % 2 == 0)
                Console.WriteLine($"Even {Square(i)}");
            else
                Console.WriteLine($"Odd {i}");
        }
    }
}
