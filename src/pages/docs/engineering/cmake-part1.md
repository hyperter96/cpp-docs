# CMake 基础

CMake 是一个项目构建工具，并且是跨平台的。关于项目构建我们所熟知的还有`Makefile`（通过 `make` 命令进行项目的构建），大多是 IDE 软件都集成了`make`，比如：VS 的 nmake、linux 下的 GNU make、Qt 的 qmake 等，如果自己动手写 `makefile`，会发现，`makefile` 通常依赖于当前的编译平台，而且编写 `makefile` 的工作量比较大，解决依赖关系时也容易出错。

而 CMake 恰好能解决上述问题， 其允许开发者指定整个工程的编译流程，在根据编译平台，自动生成本地化的`Makefile`和工程文件，最后用户只需`make`编译即可，所以可以把 CMake 看成一款自动生成`Makefile`的工具，其编译流程如下图：

![](https://subingwen.cn/cmake/CMake-primer/image-20230309130644912.png)

- 蓝色虚线表示使用`makefile`构建项目的过程
- 红色实线表示使用`cmake`构建项目的过程

介绍完 CMake 的作用之后，再来总结一下它的优点：

- 跨平台
- 能够管理大型项目
- 简化编译构建过程和编译过程
- 可扩展：可以为 `cmake` 编写特定功能的模块，扩充 `cmake` 功能

## Use of CMake

### Compile & Build an Executable File

我们希望将以下源代码编译为单个可执行文件：

```cpp
#include <cstdlib>
#include <iostream>
#include <string>

std::string say_hello() { return std::string("Hello, CMake world!"); }

int main() {
  std::cout << say_hello() << std::endl;
  return EXIT_SUCCESS;
}
```

#### Writing `CMakeLists.txt`

C++项目目录结构一般如下：

- `src` : 源码工程目录
- `ext` : 第三方依赖库文件与头文件
- `CMakeLists.txt` : `cmake` 构建配置文件

编写 `CMAKE` 配置文件 `CMakeLists.txt`:

```cmake
# cmake 最低版本需求
cmake_minimum_required(VERSION 3.13)

# 工程名称
project(cmake_study)

# 设置
set(CMAKE_CXX_STANDARD 11)

# 编译源码生成目标
add_executable(cmake_study src/main.cpp)
```

`cmake` 命令便按照 `CMakeLists` 配置文件运行构建`Makefile`文件

```bash
$ mkdir build
$ cd build/
$ cmake ..
```

为了不让编译产生的中间文件污染我们的工程，我们可以创建一个 `build` 目录进入执行 `cmake` 构建工具. 如果没有错误， 执行成功后会在 `build` 目录下产生 `Makefile` 文件。然后我们执行 `make` 命令就可以编译我们的项目了。

{% callout type="note" title="注意" %}
在与`CMakeLists.txt`相同的目录中执行`cmake .`，原则上足以配置一个项目。然而，`CMake`会将所有生成的文件写到项目的根目录中。这将是一个源代码内构建，通常是不推荐的，因为这会混合源代码和项目的目录树。我们首选的是源外构建。
{% /callout %}

`CMake`是一个构建系统生成器。将描述构建系统(如：Unix Makefile、Ninja、Visual Studio 等)应当如何操作才能编译代码。然后，`CMake`为所选的构建系统生成相应的指令。默认情况下，在 GNU/Linux 和 macOS 系统上，`CMake`使用`Unix Makefile`生成器。Windows 上，Visual Studio 是默认的生成器。在下一个示例中，我们将进一步研究生成器，并在第 13 章中重新讨论生成器。

GNU/Linux 上，`CMake`默认生成 `Unix Makefile`来构建项目：

- `Makefile`: `make`将运行指令来构建项目。
- `CMakefile`：包含临时文件的目录， `CMake`用于检测操作系统、编译器等。此外，根据所选的生成器，它还包含特定的文件。
- `cmake_install.cmake`：处理安装规则的`CMake`脚本，在项目安装时使用。
- `CMakeCache.txt`：如文件名所示，`CMake`缓存。`CMake`在重新运行配置时使用这个文件。

要构建示例项目，我们运行以下命令：

```bash
$ cmake --build .
```

### Switching Generator

`CMake`是一个构建系统生成器，可以使用单个`CMakeLists.txt`为不同平台上的不同工具集配置项目。您可以在`CMakeLists.txt`中描述构建系统必须运行的操作，以配置并编译代码。基于这些指令，`CMake`将为所选的构建系统(Unix Makefile、Ninja、Visual Studio 等等)生成相应的指令。

`CMake`针对不同平台支持本地构建工具列表。同时支持命令行工具(如 Unix Makefile 和`Ninja`)和集成开发环境(IDE)工具。用以下命令，可在平台上找到生成器名单，以及已安装的`CMake`版本：

```bash
Generators
The following generators are available on this platform:
Unix Makefiles = Generates standard UNIX makefiles.
Ninja = Generates build.ninja files.
Watcom WMake = Generates Watcom WMake makefiles.
CodeBlocks - Ninja = Generates CodeBlocks project files.
CodeBlocks - Unix Makefiles = Generates CodeBlocks project files.
CodeLite - Ninja = Generates CodeLite project files.
CodeLite - Unix Makefiles = Generates CodeLite project files.
Sublime Text 2 - Ninja = Generates Sublime Text 2 project files.
Sublime Text 2 - Unix Makefiles = Generates Sublime Text 2 project files.
Kate - Ninja = Generates Kate project files.
Kate - Unix Makefiles = Generates Kate project files.
Eclipse CDT4 - Ninja = Generates Eclipse CDT 4.0 project files.
Eclipse CDT4 - Unix Makefiles= Generates Eclipse CDT 4.0 project files.
```

#### Implementation

我们将重用前一节示例中的`hello-world.cpp`和`CMakeLists.txt`。惟一的区别在使用`CMake`时，因为现在必须显式地使用命令行方式，用`-G`切换生成器。

- 首先，使用以下步骤配置项目:

  ```bash
  $ mkdir -p build
  $ cd build
  $ cmake -G Ninja ..

  -- The CXX compiler identification is GNU 8.1.0
  -- Check for working CXX compiler: /usr/bin/c++
  -- Check for working CXX compiler: /usr/bin/c++ -- works
  -- Detecting CXX compiler ABI info
  -- Detecting CXX compiler ABI info - done
  -- Detecting CXX compile features
  -- Detecting CXX compile features - done
  -- Configuring done
  -- Generating done
  -- Build files have been written to: /home/user/cmake-cookbook/chapter-01/recipe-02/cxx-exampl
  ```

- 第二步，构建项目：

  ```bash
  $ cmake --build .

  [2/2] Linking CXX executable hello-world
  ```

#### How it works

与前一个配置相比，每一步的输出没什么变化。每个生成器都有自己的文件集，所以编译步骤的输出和构建目录的内容是不同的：

- `build.ninja`和`rules.ninja`：包含`Ninja`的所有的构建语句和构建规则。
- `CMakeCache.txt`：`CMake`会在这个文件中进行缓存，与生成器无关。
- `CMakeFiles`：包含由`CMake`在配置期间生成的临时文件。
- `cmake_install.cmake`：`CMake`脚本处理安装规则，并在安装时使用。

`cmake --build .`将`ninja`命令封装在一个跨平台的接口中。

### Static & Dynamic Library Build

项目中会有单个源文件构建的多个可执行文件的可能。项目中有多个源文件，通常分布在不同子目录中。这种实践有助于项目的源代码结构，而且支持模块化、代码重用和关注点分离。同时，这种分离可以简化并加速项目的重新编译。

回看第一个例子，这里并不再为可执行文件提供单个源文件，我们现在将引入一个类，用来包装要打印到屏幕上的消息。更新一下的`hello-world.cpp`:

```cpp
#include "Message.hpp"

#include <cstdlib>
#include <iostream>

int main() {
  Message say_hello("Hello, CMake World!");
  std::cout << say_hello << std::endl;

  Message say_goodbye("Goodbye, CMake World");
  std::cout << say_goodbye << std::endl;

  return EXIT_SUCCESS;
}
```

`Message`类包装了一个字符串，并提供重载过的`<<`操作，并且包括两个源码文件：`Message.hpp`头文件与`Message.cpp`源文件。`Message.hpp`中的接口包含以下内容：

```cpp
#pragma once

#include <iosfwd>
#include <string>

class Message {
public:
  Message(const std::string &m) : message_(m) {}
  friend std::ostream &operator<<(std::ostream &os, Message &obj) {
    return obj.printObject(os);
  }
private:
  std::string message_;
  std::ostream &printObject(std::ostream &os);
};
```

#### Implementation

这里有两个文件需要编译，所以`CMakeLists.txt`必须进行修改。本例中，先把它们编译成一个库，而不是直接编译成可执行文件:

- 创建目标——静态库。库的名称和源码文件名相同，具体代码如下：

  ```cmake
  add_library(message
    STATIC
      Message.hpp
      Message.cpp
    )
  ```

- 创建`hello-world`可执行文件的目标部分不需要修改：

  ```cmake
  add_executable(hello-world hello-world.cpp)
  ```

- 最后，将目标库链接到可执行目标：

  ```cmake
  target_link_libraries(hello-world message)
  ```

- 对项目进行配置和构建。库编译完成后，将连接到`hello-world`可执行文件中：

  ```bash
  $ mkdir -p build
  $ cd build
  $ cmake ..
  $ cmake --build .

  Scanning dependencies of target message
  [ 25%] Building CXX object CMakeFiles/message.dir/Message.cpp.o
  [ 50%] Linking CXX static library libmessage.a
  [ 50%] Built target message
  Scanning dependencies of target hello-world
  [ 75%] Building CXX object CMakeFiles/hello-world.dir/hello-world.cpp.o
  [100%] Linking CXX executable hello-world
  [100%] Built target hello-world
  ```

- 执行`hello-world`:

  ```bash
  $ ./hello-world

  This is my very nice message:
  Hello, CMake World!
  This is my very nice message:
  Goodbye, CMake World
  ```

#### How it works

本节引入了两个新命令：

- `add_library(message STATIC Message.hpp Message.cpp)`：生成必要的构建指令，将指定的源码编译到库中。`add_library`的第一个参数是目标名。整个`CMakeLists.txt`中，可使用相同的名称来引用库。生成的库的实际名称将由`CMake`通过在前面添加前缀`lib`和适当的扩展名作为后缀来形成。生成库是根据第二个参数(`STATIC`或`SHARED`)和操作系统确定的。
- `target_link_libraries(hello-world message)`: 将库链接到可执行文件。此命令还确保`hello-world`可执行文件可以正确地依赖于消息库。因此，在消息库链接到`hello-world`可执行文件之前，需要完成消息库的构建。

编译成功后，构建目录包含`libmessage.a`一个静态库(在 GNU/Linux 上)和`hello-world`可执行文件。

`CMake`接受其他值作为`add_library`的第二个参数的有效值，我们来看下本书会用到的值：

- `STATIC`：用于创建静态库，即编译文件的打包存档，以便在链接其他目标时使用，例如：可执行文件。
- `SHARED`：用于创建动态库，即可以动态链接，并在运行时加载的库。可以在`CMakeLists.txt`中使用`add_library(message SHARED Message.hpp Message.cpp)`从静态库切换到动态共享对象(`DSO`)。
- `OBJECT`：可将给定`add_library`的列表中的源码编译到目标文件，不将它们归档到静态库中，也不能将它们链接到共享对象中。如果需要一次性创建静态库和动态库，那么使用对象库尤其有用。我们将在本示例中演示。
- `MODULE`：又为`DSO`组。与`SHARED`库不同，它们不链接到项目中的任何目标，不过可以进行动态加载。该参数可以用于构建运行时插件。

### Control-flow Statement

目前为止，看到的示例比较简单，`CMake`执行流是线性的：从一组源文件到单个可执行文件，也可以生成静态库或动态库。为了确保完全控制构建项目、配置、编译和链接所涉及的所有步骤的执行流，`CMake`提供了自己的语言。本节中，我们将探索条件结构`if-else-` `else-endif`的使用。

#### Implementation

从与上一个示例的的源代码开始，我们希望能够在不同的两种行为之间进行切换：

1. 将`Message.hpp`和`Message.cpp`构建成一个库(静态或动态)，然后将生成库链接到`hello-world`可执行文件中。
2. 将`Message.hpp`，`Message.cpp`和`hello-world.cpp`构建成一个可执行文件，但不生成任何一个库。
