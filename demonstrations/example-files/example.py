def square(x: int) -> int:
    return x * x

class Greeter:
    def __init__(self, name: str):
        self.name = name

    def greet(self):
        print(f"Hello, {self.name}!")

g = Greeter("World")
g.greet()

for i in range(3):
    if i % 2 == 0:
        print("Even", square(i))
    else:
        print("Odd", i)
