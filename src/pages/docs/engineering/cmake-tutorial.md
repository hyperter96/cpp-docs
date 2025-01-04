# CMake 课后练习

本教程源代码示例可在此[存档](https://cmake.org/cmake/help/latest/_downloads/4faf523a74297ec7a15388124b7890c5/cmake-3.30.2-tutorial-source.zip)中找到。每个步骤都有自己的子目录，其中包含可用作起点的代码。教程示例是渐进式的，因此每个步骤都为上一步提供了完整的解决方案。

## A Basic Starting Point

我们先看`Step1`目录结构，具体如下：

```bash
$ tree
.
├── CMakeLists.txt
├── TutorialConfig.h.in
├── compile_commands.json
└── tutorial.cpp
```

### Building a Basic project

最基本的 `CMake` 项目是从单个源代码文件构建的可执行文件。对于像这样的简单项目，只需要一个包含三个命令的 `CMakeLists.txt` 文件即可。

{% callout type="note" title="注意" %}
尽管 `CMake` 支持大写、小写和混合大小写命令，但首选小写命令，并将在整个教程中使用小写命令。
{% /callout %}

任何项目的最顶层 `CMakeLists.txt` 都必须通过使用 `cmake_minimum_required()` 命令指定最低 `CMake` 版本来开始。这将建立策略设置并确保以下 `CMake` 函数使用兼容版本的 `CMake` 运行。

要启动项目，我们使用 `project()` 命令来设置项目名称。每个项目都需要此调用，并且应在 `cmake_minimum_required()` 之后立即调用。正如我们稍后将看到的，此命令还可用于指定其他项目级信息，例如语言或版本号。

最后，`add_executable()` 命令告诉 `CMake` 使用指定的源代码文件创建可执行文件。

#### Goal

`tutorial.cpp` 的源代码位于 `Step1` 目录中，可用于计算数字的平方根。此文件无需在此步骤中进行编辑。

同一目录中有一个 `CMakeLists.txt` 文件，您将完成该文件。从 TODO 1 开始，然后完成 TODO 3。

最后使用`cmake`构建`Step1`。

#### Implementation

打开`CMakeLists.txt`，

```cmake
# TODO 1: Set the minimum required version of CMake to be 3.10
cmake_minimum_required(VERSION 3.10)
# TODO 2: Create a project named Tutorial
project(Tutorial LANGUAGES CXX)
# TODO 7: Set the project version number as 1.0 in the above project command

# TODO 6: Set the variable CMAKE_CXX_STANDARD to 11
#         and the variable CMAKE_CXX_STANDARD_REQUIRED to True

# TODO 8: Use configure_file to configure and copy TutorialConfig.h.in to
#         TutorialConfig.h

# TODO 3: Add an executable called Tutorial to the project
# Hint: Be sure to specify the source file as tutorial.cxx
add_executable(Tutorial ./tutorial.cpp)
# TODO 9: Use target_include_directories to include ${PROJECT_BINARY_DIR}
```

一旦 TODO 1 到 TODO 3 完成，我们就可以构建和运行我们的项目了。首先创建构建的目录`Step1_build`，

```bash
mkdir Step1_build
```

接下来，导航到该构建目录并运行 `cmake` 来配置项目并生成本机构建系统：

```bash
cd Step1_build
cmake ../Step1
```

然后调用该构建系统来实际编译/链接项目：

```bash
cmake --build .
```

最后尝试使用新构建的教程：

```bash
Tutorial 4294967296
Tutorial 10
Tutorial
```

### Specifying the C++ Standard

`CMake` 有一些特殊变量，这些变量要么在后台创建，要么在由项目代码设置时对 `CMake` 有意义。其中许多变量以 `CMAKE_` 开头。在为项目创建变量时，请避免使用此命名约定。这些特殊的用户可设置变量中的两个是 `CMAKE_CXX_STANDARD` 和 `CMAKE_CXX_STANDARD_REQUIRED`。它们可以一起使用来指定构建项目所需的 C++ 标准。

#### Goal

添加需要 C++11 的功能。

继续编辑 `Step1` 目录中的文件。从 TODO 4 开始，一直到 TODO 6 完成。

首先，编辑 `tutorial.cpp`，添加需要 C++11 的功能。然后更新 `CMakeLists.txt` 以要求 C++11。

#### Implementation

TODO 4: 将`tutorial.cpp`中的`atof(argv[1])` 改成 `std::stod(argv[1])`。

TODO 5: 去掉`#include <cstdlib>`。

修改后的`tutorial.cpp`如下：

```cpp
// A simple program that computes the square root of a number
#include <cmath>
#include <iostream>
#include <string>

// TODO 11: Include TutorialConfig.h

int main(int argc, char *argv[]) {
  if (argc < 2) {
    // TODO 12: Create a print statement using Tutorial_VERSION_MAJOR
    //          and Tutorial_VERSION_MINOR
    std::cout << "Usage: " << argv[0] << " number" << std::endl;
    return 1;
  }
  // convert input to double
  // TODO 4: Replace atof(argv[1]) with std::stod(argv[1])
  const double inputValue = std::stod(argv[1]);

  // calculate square root
  const double outputValue = sqrt(inputValue);
  std::cout << "The square root of " << inputValue << " is " << outputValue
            << std::endl;
  return 0;
}
```

TODO 6: 在`CMakeLists.txt`中添加，

```cmake
set(CMAKE_CXX_STANDARD 11)
set(CMAKE_CXX_STANDARD_REQUIRED True)
```

### Adding a Version Number & Configured Header File

有时，让 `CMakelists.txt` 文件中定义的变量在源代码中可用可能会很有用。在这种情况下，我们想打印项目版本。

实现此目的的一种方法是使用已配置的头文件。我们创建一个包含一个或多个要替换的变量的输入文件。这些变量具有特殊的语法，看起来像 `@VAR@`。然后，我们使用 `configure_file()` 命令将输入`​​`文件复制到给定的输出文件，并用 `CMakelists.txt` 文件中 `VAR` 的当前值替换这些变量。

虽然我们可以直接在源代码中编辑版本，但最好使用此功能，因为它可以创建单一事实来源并避免重复。

#### Goal

定义项目的版本号。

#### Implementation

继续从`Step1` 编辑文件。从 TODO 7 开始，一直到 TODO 12 结束。在本练习中，我们首先在 `CMakeLists.txt` 中添加项目版本号。在同一个文件中，使用 `configure_file()` 将给定的输入文件复制到输出文件，并替换输入文件内容中的一些变量值。

接下来，创建一个输入头文件 `TutorialConfig.h.in`，定义将接受从 `configure_file()` 传递的变量的版本号。

最后，更新 `tutorial.cpp` 以打印出其版本号。

首先，我们修改 `CMakeLists.txt` 文件，使用 `project()` 命令来设置项目名称和版本号。调用 `project()` 命令时，`CMake` 会在后台定义 `Tutorial_VERSION_MAJOR` 和 `Tutorial_VERSION_MINOR`。

```cmake
project(Tutorial VERSION 1.0)
```

我们使用 `target_include_directories()` 来指定可执行目标应该在哪里查找包含文件。

```cmake
target_include_directories(Tutorial PUBLIC
                           "${PROJECT_BINARY_DIR}"
                           )
```

`TutorialConfig.h.in` 是要配置的输入头文件。当从我们的 `CMakeLists.txt` 调用 `configure_file()` 时，`@Tutorial_VERSION_MAJOR@` 和 `@Tutorial_VERSION_MINOR@` 的值将被替换为 `TutorialConfig.h` 中项目的相应版本号。

```cpp
#define Tutorial_VERSION_MAJOR 1.0
#define Tutorial_VERSION_MINOR 0.1
```

接下来，我们需要修改`tutorial.cpp`以包含配置的头文件`TutorialConfig.h`。

```cpp
#include "TutorialConfig.h"
```

最后，我们通过更新 `tutorial.cpp` 打印出可执行文件名称和版本号，如下所示：

```cpp
if (argc < 2) {
    // report version
    std::cout << argv[0] << " Version " << Tutorial_VERSION_MAJOR << "."
              << Tutorial_VERSION_MINOR << std::endl;
    std::cout << "Usage: " << argv[0] << " number" << std::endl;
    return 1;
}
```
