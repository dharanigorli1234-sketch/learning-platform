import { ProgrammingLanguage } from '../types';

export const ALL_PROGRAMMING_LANGUAGES: ProgrammingLanguage[] = [
  {
    id: 'lang-c',
    name: 'C',
    slug: 'c',
    version: 'C17 / C23',
    tagline: 'The Mother of Modern Systems Programming & Operating Systems',
    introduction: 'Developed by Dennis Ritchie at Bell Labs in 1972, C provides direct low-level hardware memory manipulation with high-level language constructs. It remains the foundation of operating systems (Linux, Windows, macOS kernels), embedded microcontrollers, compilers, and game engines.',
    recommendedForBranches: ['CSE', 'ECE', 'EEE', 'Mechanical', 'IT', 'Other'],
    syntaxSnippet: `#include <stdio.h>

// Function prototype
int computeFactorial(int n);

int main() {
    int number = 5;
    int result = computeFactorial(number);
    printf("Factorial of %d is %d\\n", number, result);
    return 0;
}

int computeFactorial(int n) {
    if (n <= 1) return 1;
    return n * computeFactorial(n - 1);
}`,
    concepts: [
      {
        id: 'c-concept-1',
        title: 'Pointers & Direct Memory Addressing',
        description: 'Pointers store the hexadecimal memory address of another variable, enabling dynamic allocation and efficient array pass-by-reference.',
        codeSnippet: `int value = 42;
int *ptr = &value; // Address-of operator

printf("Value: %d\\n", *ptr); // Dereference: 42
*ptr = 100; // Directly modifies memory
printf("Updated: %d\\n", value); // 100`,
        explanation: 'Pointers eliminate expensive copying of large structures and enable hardware register mapping in embedded firmware.'
      },
      {
        id: 'c-concept-2',
        title: 'Dynamic Memory Allocation (malloc, calloc, free)',
        description: 'Heap memory management enables variable-sized buffers allocated at runtime that persist until explicitly deallocated.',
        codeSnippet: `int *arr = (int*)malloc(5 * sizeof(int));
if (arr == NULL) {
    perror("Memory allocation failed");
    return 1;
}

for (int i = 0; i < 5; i++) arr[i] = (i + 1) * 10;
// Memory must be released to avoid leaks
free(arr);
arr = NULL; // Prevent dangling pointer`,
        explanation: 'Failing to call free() causes memory leaks; accessing after free() causes undefined behavior or segmentation faults.'
      },
      {
        id: 'c-concept-3',
        title: 'Bitwise Operators & Hardware Register Masking',
        description: 'Direct manipulation of individual binary bits inside registers using bit shifts and boolean masks.',
        codeSnippet: `unsigned char reg = 0b00000000;
// Set bit 3:
reg |= (1 << 3);  // 00001000
// Clear bit 3:
reg &= ~(1 << 3); // 00000000
// Toggle bit 1:
reg ^= (1 << 1);  // 00000010`,
        explanation: 'Essential for ECE/EEE students configuring microcontroller GPIO pins, interrupt masks, and serial communication baud rates.'
      }
    ],
    practiceQuestions: [
      {
        id: 'c-pq-1',
        title: 'Reverse a Linked List in O(1) Extra Space',
        difficulty: 'Medium',
        description: 'Given the head pointer of a singly linked list, reverse the node pointers in place and return the new head pointer.',
        sampleInput: 'Head -> 1 -> 2 -> 3 -> 4 -> 5 -> NULL',
        sampleOutput: 'Head -> 5 -> 4 -> 3 -> 2 -> 1 -> NULL',
        hint: 'Maintain three pointers: prev = NULL, curr = head, next = NULL, and iterate through the list.',
        solutionCode: `struct Node* reverseList(struct Node* head) {
    struct Node* prev = NULL;
    struct Node* curr = head;
    struct Node* next = NULL;
    while (curr != NULL) {
        next = curr->next;
        curr->next = prev;
        prev = curr;
        curr = next;
    }
    return prev;
}`
      },
      {
        id: 'c-pq-2',
        title: 'Detect Endianness of the Host Architecture',
        difficulty: 'Easy',
        description: 'Write a program to determine if the host CPU is Little-Endian or Big-Endian using a char pointer cast.',
        sampleInput: 'Execution on x86_64 CPU',
        sampleOutput: 'Little-Endian Architecture',
        hint: 'Store integer 1 in an unsigned int and check if the byte at the lowest address is 1.',
        solutionCode: `int checkEndianness() {
    unsigned int x = 0x76543210;
    char *c = (char*)&x;
    if (*c == 0x10) {
        printf("Little-Endian\\n");
    } else {
        printf("Big-Endian\\n");
    }
    return 0;
}`
      }
    ],
    interviewQuestions: [
      {
        id: 'c-iq-1',
        question: 'What is the exact difference between `malloc()` and `calloc()`?',
        answer: 'malloc(size) allocates a contiguous uninitialized block of raw memory leaving contents with unpredictable garbage values. calloc(num_elements, element_size) allocates memory and clears every single byte to zero, which has slight runtime overhead but ensures deterministic initialization.',
        frequency: 'Very High',
        companies: ['Qualcomm', 'Intel', 'Texas Instruments', 'Cisco'],
        keyTip: 'Highlight that calloc checks for multiplication overflow internally before requesting memory.'
      },
      {
        id: 'c-iq-2',
        question: 'What does the `volatile` keyword do in C?',
        answer: 'The volatile qualifier informs the compiler optimizer that a variable value may change unexpectedly outside the current program execution flow (e.g., modified by a hardware peripheral register or an asynchronous Interrupt Service Routine ISR). It prevents the compiler from caching the variable in a CPU register or eliding repeated reads.',
        frequency: 'Very High',
        companies: ['Embedded Systems Teams', 'Nvidia', 'Samsung', 'ARM'],
        keyTip: 'Always mention hardware registers and multithreading flag polling.'
      }
    ]
  },
  {
    id: 'lang-cpp',
    name: 'C++',
    slug: 'cpp',
    version: 'C++20 / C++23',
    tagline: 'High-Performance Object-Oriented & Generic Systems Language',
    introduction: 'Engineered by Bjarne Stroustrup, C++ brings zero-cost abstractions, Object-Oriented Programming (OOP), templates, and the robust Standard Template Library (STL). It powers competitive programming, game engines (Unreal Engine), high-frequency financial trading systems, and computer vision backends.',
    recommendedForBranches: ['CSE', 'IT', 'AI & ML', 'ECE'],
    syntaxSnippet: `#include <iostream>
#include <vector>
#include <algorithm>

int main() {
    std::vector<int> numbers = {42, 7, 19, 88, 3};
    std::sort(numbers.begin(), numbers.end());
    
    std::cout << "Sorted elements: ";
    for (const auto& num : numbers) {
        std::cout << num << " ";
    }
    std::cout << "\\n";
    return 0;
}`,
    concepts: [
      {
        id: 'cpp-concept-1',
        title: 'RAII (Resource Acquisition Is Initialization)',
        description: 'Guarantees resource release (heap memory, file handles, mutex locks) when object scope exits via destructors.',
        codeSnippet: `class FileGuard {
    FILE* handle;
public:
    FileGuard(const char* path) { handle = fopen(path, "r"); }
    ~FileGuard() { if (handle) fclose(handle); } // Auto closed!
};`,
        explanation: 'RAII eliminates memory leaks even when exceptions are thrown across deeply nested call stacks.'
      },
      {
        id: 'cpp-concept-2',
        title: 'Standard Template Library (STL) Containers & Algorithms',
        description: 'Pre-optimized generic data structures: vector, map (Red-Black tree), unordered_map (hash table), and priority_queue (heap).',
        codeSnippet: `#include <unordered_map>
std::unordered_map<std::string, int> freq;
freq["apple"]++;
freq["banana"] = 5;

if (freq.find("apple") != freq.end()) {
    std::cout << "Found: " << freq["apple"] << "\\n";
}`,
        explanation: 'Provides amortized O(1) average lookup and insertion, essential for competitive programming.'
      }
    ],
    practiceQuestions: [
      {
        id: 'cpp-pq-1',
        title: 'Top K Frequent Elements using Min-Heap',
        difficulty: 'Medium',
        description: 'Given an integer array nums and an integer k, return the k most frequent elements in O(N log k) time.',
        sampleInput: 'nums = [1,1,1,2,2,3], k = 2',
        sampleOutput: '[1, 2]',
        hint: 'Count frequencies with an unordered_map, then maintain a min-heap priority_queue of size k.',
        solutionCode: `vector<int> topKFrequent(vector<int>& nums, int k) {
    unordered_map<int, int> count;
    for (int n : nums) count[n]++;
    
    // min-heap storing pair<frequency, element>
    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<>> minHeap;
    for (auto& [val, freq] : count) {
        minHeap.push({freq, val});
        if (minHeap.size() > k) minHeap.pop();
    }
    vector<int> result;
    while (!minHeap.empty()) {
        result.push_back(minHeap.top().second);
        minHeap.pop();
    }
    return result;
}`
      }
    ],
    interviewQuestions: [
      {
        id: 'cpp-iq-1',
        question: 'Explain Virtual Functions, VTable, and Virtual Destructors.',
        answer: 'Virtual functions enable runtime polymorphism via dynamic dispatch. The compiler creates a Virtual Method Table (VTable) for each class containing virtual methods, and inserts a hidden pointer (vptr) in each class instance pointing to this table. Base classes MUST declare virtual destructors to prevent partial deletion when destroying a derived object through a base pointer.',
        frequency: 'High',
        companies: ['Google', 'Microsoft', 'Adobe', 'Bloomberg'],
        keyTip: 'Explain why vptr adds 8 bytes to object size on 64-bit systems.'
      }
    ]
  },
  {
    id: 'lang-java',
    name: 'Java',
    slug: 'java',
    version: 'Java 21 LTS',
    tagline: 'Enterprise Scale, Type Safety & Write Once Run Anywhere',
    introduction: 'Designed by James Gosling at Sun Microsystems, Java executes atop the Java Virtual Machine (JVM). It powers global enterprise financial backends (Spring Boot), Android mobile applications, Big Data ecosystems (Hadoop, Apache Kafka), and distributed microservices.',
    recommendedForBranches: ['CSE', 'IT', 'AI & DS'],
    syntaxSnippet: `public class Main {
    public static void main(String[] args) {
        Student student = new Student("Priya", "CSE", 3);
        System.out.println(student.getDetails());
    }
}

record Student(String name, String branch, int year) {
    public String getDetails() {
        return name + " · " + branch + " (" + year + "rd Year)";
    }
}`,
    concepts: [
      {
        id: 'java-concept-1',
        title: 'JVM Memory Architecture (Heap vs Stack)',
        description: 'Methods and local primitives reside on Thread Stack, whereas all object instances and class data reside on the shared Garbage-Collected Heap.',
        codeSnippet: `// Primitive on Stack:
int count = 10;
// Object instance created on Heap, reference stored on Stack:
StringBuilder sb = new StringBuilder("StudySphere");`,
        explanation: 'JVM Garbage Collectors (G1, ZGC) monitor unreachable heap objects to prevent leaks without manual memory tracking.'
      },
      {
        id: 'java-concept-2',
        title: 'Java Streams API & Functional Pipelines',
        description: 'Declarative parallelizable data transformations over collections using lambda expressions.',
        codeSnippet: `List<String> names = List.of("Algorithm", "Circuit", "Database", "Robotics");
List<String> filtered = names.stream()
    .filter(s -> s.length() > 7)
    .map(String::toUpperCase)
    .toList(); // [ALGORITHM, DATABASE, ROBOTICS]`,
        explanation: 'Enables high readability and seamless multicore execution via .parallelStream().'
      }
    ],
    practiceQuestions: [
      {
        id: 'java-pq-1',
        title: 'Find Longest Substring Without Repeating Characters',
        difficulty: 'Medium',
        description: 'Given a string s, find the length of the longest substring without repeating characters in O(n) time.',
        sampleInput: 's = "abcabcbb"',
        sampleOutput: '3 (The answer is "abc")',
        hint: 'Use a sliding window with two pointers and a HashMap storing character last-seen indices.',
        solutionCode: `public int lengthOfLongestSubstring(String s) {
    Map<Character, Integer> map = new HashMap<>();
    int maxLen = 0, left = 0;
    for (int right = 0; right < s.length(); right++) {
        char c = s.charAt(right);
        if (map.containsKey(c)) {
            left = Math.max(left, map.get(c) + 1);
        }
        map.put(c, right);
        maxLen = Math.max(maxLen, right - left + 1);
    }
    return maxLen;
}`
      }
    ],
    interviewQuestions: [
      {
        id: 'java-iq-1',
        question: 'Why is String immutable in Java?',
        answer: '1. Security: Strings carry sensitive data (passwords, network sockets, DB credentials); immutability prevents malicious alteration. 2. Thread Safety: Immutable objects are naturally thread-safe without synchronization locks. 3. String Pool (Flyweight pattern): Allows multiple references to reuse identical literals in heap memory to save massive RAM.',
        frequency: 'Very High',
        companies: ['Amazon', 'Oracle', 'Goldman Sachs', 'Infosys'],
        keyTip: 'Mention how immutability enables stable hash code caching for HashMaps.'
      }
    ]
  },
  {
    id: 'lang-python',
    name: 'Python',
    slug: 'python',
    version: 'Python 3.12 / 3.13',
    tagline: 'The Lingua Franca of Data Science, AI & Automation',
    introduction: 'Created by Guido van Rossum, Python emphasizes extreme human readability and expressive elegance. It is the dominant ecosystem for Artificial Intelligence, Machine Learning (PyTorch, TensorFlow), scientific computing (NumPy, SciPy), computational engineering, and rapid API backend prototyping (FastAPI).',
    recommendedForBranches: ['AI & ML', 'AI & DS', 'CSE', 'ECE', 'Mechanical', 'Civil', 'EEE', 'IT'],
    syntaxSnippet: `import numpy as np

def compute_eigenvectors(matrix: np.ndarray):
    eigenvalues, eigenvectors = np.linalg.eig(matrix)
    return eigenvalues, eigenvectors

# 2x2 Covariance Matrix
A = np.array([[4, 2], [1, 3]])
vals, vecs = compute_eigenvectors(A)
print(f"Eigenvalues: {vals}")
print(f"Eigenvectors:\\n{vecs}")`,
    concepts: [
      {
        id: 'py-concept-1',
        title: 'List & Dictionary Comprehensions',
        description: 'Concise syntax for filtering and transforming iterables into new collections in a single expressive line.',
        codeSnippet: `matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
# Transpose matrix in one line
transposed = [[row[i] for row in matrix] for i in range(3)]
# Filter squared evens
evens_squared = {x: x**2 for x in range(10) if x % 2 == 0}`,
        explanation: 'Executes in optimized C-level bytecode faster than manual append loops.'
      },
      {
        id: 'py-concept-2',
        title: 'Generators & The Yield Statement',
        description: 'Functions that return lazy iterators producing values on-demand without populating entire sequences into RAM.',
        codeSnippet: `def fibonacci_stream(limit: int):
    a, b = 0, 1
    for _ in range(limit):
        yield a
        a, b = b, a + b

# Consumes negligible memory even for millions of elements
for val in fibonacci_stream(5):
    print(val, end=" ") # 0 1 1 2 3`,
        explanation: 'Critical for Big Data analytics, streaming multi-gigabyte CSV or JSON files without Out-Of-Memory crashes.'
      }
    ],
    practiceQuestions: [
      {
        id: 'py-pq-1',
        title: 'Group Anagrams using Sorted Tuple Hashing',
        difficulty: 'Medium',
        description: 'Given an array of strings, group the anagrams together in O(N * K log K) time.',
        sampleInput: '["eat","tea","tan","ate","nat","bat"]',
        sampleOutput: '[["bat"],["nat","tan"],["ate","eat","tea"]]',
        hint: 'Use a collections.defaultdict(list) where the key is the sorted character tuple of each word.',
        solutionCode: `from collections import defaultdict

def groupAnagrams(strs: list[str]) -> list[list[str]]:
    anagram_map = defaultdict(list)
    for word in strs:
        key = tuple(sorted(word))
        anagram_map[key].append(word)
    return list(anagram_map.values())`
      }
    ],
    interviewQuestions: [
      {
        id: 'py-iq-1',
        question: 'What is the Python Global Interpreter Lock (GIL) and how is it bypassed?',
        answer: 'The GIL is a mutex in CPython that prevents multiple native threads from executing Python bytecodes concurrently, ensuring thread-safe reference counting memory management. It is bypassed for CPU-bound tasks using the `multiprocessing` module (spawning distinct OS processes with independent memory spaces) or offloading computations to C extensions (like NumPy, PyTorch) which release the GIL during matrix math.',
        frequency: 'High',
        companies: ['Meta', 'Uber', 'Two Sigma', 'Microsoft'],
        keyTip: 'Mention Python 3.13 free-threaded experimental build (PEP 703) targeting no-GIL.'
      }
    ]
  },
  {
    id: 'lang-javascript',
    name: 'JavaScript',
    slug: 'javascript',
    version: 'ECMAScript 2024',
    tagline: 'The Interactive Engine of the Modern Web & Distributed Microservices',
    introduction: 'Created by Brendan Eich in 1995, JavaScript powers the entire interactive web. With Node.js, V8 JIT compilation, and TypeScript, it runs seamlessly across browsers, edge servers, cloud serverless lambdas, and mobile apps (React Native).',
    recommendedForBranches: ['CSE', 'IT', 'AI & DS'],
    syntaxSnippet: `// Asynchronous API fetch pipeline
async function fetchEngineeringData(endpoint) {
    try {
        const response = await fetch(endpoint);
        if (!response.ok) throw new Error(\`HTTP \${response.status}\`);
        const data = await response.json();
        return data;
    } catch (err) {
        console.error("Telemetry failed:", err.message);
    }
}`,
    concepts: [
      {
        id: 'js-concept-1',
        title: 'The Event Loop, Microtasks & Macrotasks',
        description: 'Single-threaded non-blocking concurrency model separating synchronous execution from Promise microtasks and timer macrotasks.',
        codeSnippet: `console.log("1");
setTimeout(() => console.log("2 (Macrotask)"), 0);
Promise.resolve().then(() => console.log("3 (Microtask)"));
console.log("4");
// Output: 1 -> 4 -> 3 -> 2`,
        explanation: 'Microtasks (Promises, queueMicrotask) are drained completely before the next macrotask is executed from the queue.'
      },
      {
        id: 'js-concept-2',
        title: 'Closures & Lexical Scoping',
        description: 'A closure is the combination of a function bundled together with references to its surrounding state (lexical environment).',
        codeSnippet: `function createCounter(start = 0) {
    let count = start; // Encapsulated private state
    return {
        increment: () => ++count,
        value: () => count
    };
}
const counter = createCounter(10);
counter.increment(); // 11`,
        explanation: 'Enables data privacy, factory functions, and function currying without requiring class boilerplate.'
      }
    ],
    practiceQuestions: [
      {
        id: 'js-pq-1',
        title: 'Implement Custom Debounce Function with Leading/Trailing Options',
        difficulty: 'Medium',
        description: 'Build a debounce utility that delays invoking the supplied function until after wait milliseconds have elapsed.',
        sampleInput: 'Rapid keyup events in search input bar',
        sampleOutput: 'Single API network dispatch after 300ms of user typing idle',
        hint: 'Use clearTimeout on existing timer ID and return a closure capturing the timeout handle.',
        solutionCode: `function debounce(func, delay = 300) {
    let timerId;
    return function (...args) {
        clearTimeout(timerId);
        timerId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}`
      }
    ],
    interviewQuestions: [
      {
        id: 'js-iq-1',
        question: 'What is the difference between `==` and `===` in JavaScript?',
        answer: '`==` performs abstract type coercion (converting operands to a common type using JavaScript coercion rules before comparison), leading to unexpected results like `0 == false` (true) or `null == undefined` (true). `===` performs strict equality checking both value and type without coercion, preventing subtle edge-case bugs.',
        frequency: 'High',
        companies: ['Netflix', 'Amazon', 'Atlassian', 'Stripe'],
        keyTip: 'Mention Object.is() for distinguishing -0 from +0 and NaN from NaN.'
      }
    ]
  },
  {
    id: 'lang-sql',
    name: 'SQL',
    slug: 'sql',
    version: 'ANSI SQL / PostgreSQL 16',
    tagline: 'Declarative Relational Algebra & Industrial Data Querying',
    introduction: 'Structured Query Language (SQL) is the global standard for managing and querying structured relational databases (PostgreSQL, MySQL, SQLite, Oracle). Every engineering student must master SQL for data persistence, analytics, aggregations, window functions, and indexing optimization.',
    recommendedForBranches: ['CSE', 'IT', 'AI & DS', 'AI & ML', 'ECE', 'Civil'],
    syntaxSnippet: `-- Window function: Rank students by GPA within each branch
SELECT 
    student_id,
    name,
    branch,
    gpa,
    DENSE_RANK() OVER (PARTITION BY branch ORDER BY gpa DESC) as branch_rank
FROM students
WHERE graduation_year = 2026;`,
    concepts: [
      {
        id: 'sql-concept-1',
        title: 'SQL Join Topologies (Inner, Left, Cross, Full Outer)',
        description: 'Combining records from two or more tables based on related keys using relational algebraic cartesian reduction.',
        codeSnippet: `SELECT e.name, d.department_name
FROM employees e
INNER JOIN departments d ON e.dept_id = d.id;`,
        explanation: 'Understanding Join hash and nested-loop physical execution plans prevents catastrophic full table scans.'
      },
      {
        id: 'sql-concept-2',
        title: 'Analytical Window Functions (OVER, PARTITION BY)',
        description: 'Calculate running totals, moving averages, and ranks across row sets without collapsing rows like GROUP BY.',
        codeSnippet: `SELECT 
    exam_date,
    marks,
    AVG(marks) OVER (ORDER BY exam_date ROWS BETWEEN 2 PRECEDING AND CURRENT ROW) as moving_avg
FROM exam_scores;`,
        explanation: 'Indispensable for data engineering, financial timeseries, and university analytics reporting.'
      }
    ],
    practiceQuestions: [
      {
        id: 'sql-pq-1',
        title: 'Find the Second Highest Salary without using LIMIT / TOP',
        difficulty: 'Easy',
        description: 'Query the second highest distinct salary from an Employee table; return NULL if no second highest exists.',
        sampleInput: 'Employee table with salaries: [100, 200, 300]',
        sampleOutput: '200',
        hint: 'Use MAX(salary) subquery where salary < (SELECT MAX(salary) FROM Employee).',
        solutionCode: `SELECT MAX(salary) AS SecondHighestSalary
FROM Employee
WHERE salary < (SELECT MAX(salary) FROM Employee);`
      }
    ],
    interviewQuestions: [
      {
        id: 'sql-iq-1',
        question: 'What is the exact execution order of an SQL query?',
        answer: 'Unlike code written top-to-bottom, the database engine executes SQL clauses in this strict logical sequence: 1. FROM & JOINs -> 2. WHERE -> 3. GROUP BY -> 4. HAVING -> 5. SELECT -> 6. DISTINCT -> 7. ORDER BY -> 8. LIMIT / OFFSET.',
        frequency: 'Very High',
        companies: ['Snowflake', 'Palantir', 'Salesforce', 'JPMorgan'],
        keyTip: 'Explain why column aliases defined in SELECT cannot be filtered inside the WHERE clause.'
      }
    ]
  },
  {
    id: 'lang-html',
    name: 'HTML',
    slug: 'html',
    version: 'HTML5 Living Standard',
    tagline: 'Semantic Structural Backbone of the World Wide Web',
    introduction: 'HyperText Markup Language (HTML5) establishes the foundational semantic document tree for web applications. It delivers accessible elements (main, nav, article), canvas 2D/WebGL graphics rendering, audio/video playback, and native web accessibility (ARIA).',
    recommendedForBranches: ['CSE', 'IT'],
    syntaxSnippet: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>StudySphere Lab</title>
</head>
<body>
    <header>
        <nav aria-label="Main Navigation">
            <a href="#dashboard">Dashboard</a>
        </nav>
    </header>
    <main>
        <article>
            <h1>Engineering Portal</h1>
        </article>
    </main>
</body>
</html>`,
    concepts: [
      {
        id: 'html-concept-1',
        title: 'Semantic HTML5 Architecture & Screen Readers',
        description: 'Using semantic elements (<header>, <nav>, <main>, <section>, <article>, <aside>, <footer>) instead of generic <div> tags.',
        codeSnippet: `<main id="main-content">
  <article>
    <h2>Understanding CMOS Logic</h2>
    <p>Complementary MOS circuits use paired NMOS and PMOS.</p>
  </article>
</main>`,
        explanation: 'Enables assistive technologies to navigate documents cleanly and dramatically boosts SEO indexing.'
      }
    ],
    practiceQuestions: [
      {
        id: 'html-pq-1',
        title: 'Accessible Registration Form with Built-In Validation Attributes',
        difficulty: 'Easy',
        description: 'Construct a form with email, password pattern matching, required attributes, and linked label associations.',
        sampleInput: 'Student registration form with client-side constraints',
        sampleOutput: 'Fully accessible form compliant with WCAG AA',
        hint: 'Use for="input_id" on labels and pattern=".{8,}" on password inputs.',
        solutionCode: `<form action="/register" method="POST">
  <label for="student-email">University Email:</label>
  <input type="email" id="student-email" name="email" required autocomplete="email">
  
  <label for="pwd">Password (min 8 chars):</label>
  <input type="password" id="pwd" name="password" minlength="8" required>
  
  <button type="submit">Submit Registration</button>
</form>`
      }
    ],
    interviewQuestions: [
      {
        id: 'html-iq-1',
        question: 'What is the role of the HTML doctype `<!DOCTYPE html>`?',
        answer: 'The doctype declaration instructs the browser rendering engine to parse and render the document in modern Standard Mode rather than Quirks Mode (which emulates buggy behaviors of 1990s legacy Netscape/IE browsers).',
        frequency: 'Medium',
        companies: ['Frontend Engineering Teams'],
        keyTip: 'Always mention Standard Mode vs Quirks Mode.'
      }
    ]
  },
  {
    id: 'lang-css',
    name: 'CSS',
    slug: 'css',
    version: 'CSS3 / CSS Modern (Flexbox, Grid, Container Queries)',
    tagline: 'Visual Styling, Spatial Layouts & Responsive Aesthetics',
    introduction: 'Cascading Style Sheets (CSS) determines visual layout, colors, typography, fluid animations, and responsive breakpoints across screens. Modern CSS introduces Flexbox, CSS Grid, Container Queries, CSS Variables, and hardware-accelerated transforms.',
    recommendedForBranches: ['CSE', 'IT'],
    syntaxSnippet: `/* Responsive Engineering Grid */
.dashboard-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
    padding: 2rem;
}

.subject-card {
    border-radius: 0.75rem;
    transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.subject-card:hover {
    transform: translateY(-2px);
}`,
    concepts: [
      {
        id: 'css-concept-1',
        title: 'CSS Grid vs Flexbox: 2D vs 1D Layout Systems',
        description: 'Flexbox aligns items along a single axis (row OR column), whereas CSS Grid controls both rows AND columns simultaneously.',
        codeSnippet: `/* 2D Grid with auto-fill */
.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1rem;
}`,
        explanation: 'Enables fluid responsive layouts without cumbersome media query spaghetti.'
      }
    ],
    practiceQuestions: [
      {
        id: 'css-pq-1',
        title: 'Perfect Centering with Modern CSS',
        difficulty: 'Easy',
        description: 'Demonstrate the 2-line modern CSS solution to center an element horizontally and vertically inside a parent.',
        sampleInput: 'Centered modal or loader spinner',
        sampleOutput: 'Element centered at parent centroid',
        hint: 'Use display: grid and place-items: center.',
        solutionCode: `.parent {
  display: grid;
  place-items: center;
  min-height: 100vh;
}`
      }
    ],
    interviewQuestions: [
      {
        id: 'css-iq-1',
        question: 'Explain CSS Specificity and the Cascade Calculation.',
        answer: 'Specificity determines which CSS rule applies when multiple selectors target the same element. It is calculated in four categories (Inline styles > IDs > Classes/Attributes/Pseudo-classes > Elements/Pseudo-elements). `!important` overrides normal specificity cascades.',
        frequency: 'High',
        companies: ['Meta', 'Shopify', 'Airbnb'],
        keyTip: 'Explain why 10 classes can never override 1 single ID selector.'
      }
    ]
  }
];
