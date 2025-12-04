public class example {

    static int multiply(int a, int b) {
        return a * b;
    }

    public static void main(String[] args) {
        System.out.println("Java Theme Test");

        for (int i = 1; i <= 3; i++) {
            if (i % 2 == 0)
                System.out.println("Even " + multiply(i, i));
            else
                System.out.println("Odd " + i);
        }
    }
}
