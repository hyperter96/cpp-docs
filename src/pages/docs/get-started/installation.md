# gcc 和 g++ 安装

## Introduction for `gcc` and `g++`

**GCC（GNU Compiler Collection）** 是由 GNU 项目开发的一套广泛使用的开源编译器集合。它支持多种编程语言，包括**C**、**C++**、**Objective-C**、**Fortran**、**Ada**和其他语言。GCC 是一个强大而灵活的编译器，被广泛用于开发各种应用程序、库和操作系统。

`g++`是 GCC 编译器中用于编译 C++程序的前端工具。它支持**C++11、C++14、C++17**等不同版本的 C++标准，并提供了对 C++特性的广泛支持。`g++`通过将 C++源代码编译为可执行文件来转换 C++程序。它可以处理包括类、继承、多态性、模板等在内的 C++语言特性，并提供了对标准库的支持。

以下是`gcc`和`g++`的一些特点和功能：

- **跨平台**： `gcc`和`g++`可在多个操作系统上运行，包括 Linux、Windows、macOS 等。它们提供了平台无关的编译能力。
- **优化能力**： `gcc`和`g++`提供了多种优化选项，以提高生成的可执行文件的性能。这些选项可以根据目标平台、应用程序需求和开发人员的偏好进行配置。
- **多语言支持**：除了 C 和 C++，`gcc`还支持其他编程语言，如 Objective-C、Fortran、Ada 等。这使得`gcc`成为开发多种语言应用的综合解决方案。
- **标准兼容性**： `gcc`和`g++`严格遵循相关编程语言的标准规范，并不断更新以适应新的语言标准。
- **插件系统**： `gcc`提供了一个灵活的插件系统，允许开发人员编写自定义的编译器插件，以扩展和定制编译器的功能。
- **调试支持**： `gcc`和`g++`可以生成符号表，以支持源代码级别的调试。它们集成了调试器（如`GDB`），允许开发人员在调试过程中检查程序的状态和执行。
- **开源**： `gcc`和`g++`是开源软件，遵循 GNU 通用公共许可证（GPL）。这意味着开发人员可以自由访问、使用和修改这些编译器，以满足自己的需求。

总之，`gcc`和`g++`是功能强大的编译器工具，广泛用于编译、构建和优化各种编程语言的应用程序和库。无论是开发小型项目还是庞大复杂的软件，它们都提供了丰富的功能和灵活性，使开发人员能够高效地进行软件开发。

## Install `gcc` and `g++` on Ubuntu

安装`gcc`和`g++`：

```bash
sudo apt update
sudo apt install build-essential
```

回车运行等待即可。

验证安装：安装完成后，输入以下命令验证`gcc`和`g++`的安装是否成功：

```bash
gcc --version
g++ --version
```

编译和运行 C 程序：代码如下

```c
#include <stdio.h>

int main() {
    printf("Hello, gcc!\n");
    return 0;
}
```

使用下面编译命令编译

```bash
gcc main.c -o main
```

编译完成后使用下面的命令运行：

```bash
./main
```

终端将显示`"Hello, gcc!"`，这证明您的程序已成功编译和运行。

编译和运行 C++程序：

```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "Hello, g++!" << endl;
    return 0;
}
```

编译：

```bash
g++ hello.cpp -o hello
```

运行：

```bash
./hello
```

终端将显示`"Hello, g++!"`，这证明您的 C++程序已成功编译和运行。

## Options for `gcc` and `g++`

`gcc`和`g++`提供了许多选项，可用于控制编译和链接过程。

1. 使用`-c`选项只进行编译，不进行链接：

   ```bash
   gcc -c source.c   // 编译source.c文件，生成目标文件source.o
   ```

2. 使用`-o`选项指定输出文件名：

   ```bash
   gcc source.c -o output   // 编译source.c文件，并将输出文件命名为output
   ```

3. 使用`-Wall`选项启用所有警告信息：

   ```bash
   gcc -Wall source.c   // 编译source.c文件，并启用所有警告信息
   ```

4. 使用`-g`选项启用调试信息：

   ```bash
   gcc -g source.c   // 编译source.c文件，并生成带调试信息的可执行文件
   ```

5. 使用`-I`选项指定包含文件的目录：

   ```bash
   gcc -I include source.c   // 编译source.c文件时，在include目录中查找包含文件
   ```

6. 使用`-L`选项指定库文件的目录：

   ```bash
   gcc -L /path/to/lib source.c -o output   // 编译source.c文件时，在指定目录中查找库文件
   ```
