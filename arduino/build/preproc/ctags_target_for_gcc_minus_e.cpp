# 1 "/Users/davidbuezas/code/arduino-web-oscilloscope/arduino/src/MemoryFree.cpp"

# 3 "/Users/davidbuezas/code/arduino-web-oscilloscope/arduino/src/MemoryFree.cpp" 2




extern unsigned int __heap_start;
extern void *__brkval;

/*
 * The free list structure as maintained by the
 * avr-libc memory allocation routines.
 */
struct __freelist
{
  size_t sz;
  struct __freelist *nx;
};

/* The head of the free list structure */
extern struct __freelist *__flp;

# 24 "/Users/davidbuezas/code/arduino-web-oscilloscope/arduino/src/MemoryFree.cpp" 2

/* Calculates the size of the free list */
int freeListSize()
{
  struct __freelist* current;
  int total = 0;
  for (current = __flp; current; current = current->nx)
  {
    total += 2; /* Add two bytes for the memory block's header  */
    total += (int) current->sz;
  }

  return total;
}

int freeMemory()
{
  int free_memory;
  if ((int)__brkval == 0)
  {
    free_memory = ((int)&free_memory) - ((int)&__heap_start);
  }
  else
  {
    free_memory = ((int)&free_memory) - ((int)__brkval);
    free_memory += freeListSize();
  }
  return free_memory;
}
# 1 "/Users/davidbuezas/code/arduino-web-oscilloscope/arduino/src/dac.ino"
// #include "v1.h"
# 2 "/Users/davidbuezas/code/arduino-web-oscilloscope/arduino/src/dac.ino" 2
