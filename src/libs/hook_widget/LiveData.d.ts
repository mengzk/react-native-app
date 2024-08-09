/**
 * Author: Meng
 * Date: 2024-08-10
 * Desc:
 */

declare class LiveData<T> {
  constructor(value: T);

  public update(data: T): void;

  public next(data: T): void;

  // bind(func: (data: T) => void): void;
  // unbind(): void;
}

export default LiveData;
