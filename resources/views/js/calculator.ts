class Calculator {
  add(x: number, y: number) {
    return x + y
  }
  substracte(x: number, y: number) {
    return x - y
  }
  multiplicate(x: number, y: number) {
    return x * y
  }
  remainder(x: number, y: number) {
    return x % y
  }
  divide(x: number, y: number) {
    return x / y
  }

  operation(method: string, ...params: number[]) {
    const first_and_second = [...params]
    try {
      if (method === 'ADD') {
        return this.add(first_and_second[0], first_and_second[1])
      } else if (method === 'SUB') {
        return this.substracte(first_and_second[0], first_and_second[1])
      } else if (method === 'MULTI') {
        return this.multiplicate(first_and_second[0], first_and_second[1])
      } else if (method === 'REMIND') {
        return this.remainder(first_and_second[0], first_and_second[1])
      } else if (method === 'DIVIDE') {
        return this.divide(first_and_second[0], first_and_second[1])
      }
    } catch {
      throw new Error('Operation not defined')
    }
  }
}
