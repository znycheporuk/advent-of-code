const std = @import("std");
const fs = std.fs;
const io = std.io;
const debug = std.debug;

const test_file_name = "day-01/test-input.txt";
const file_name = "day-01/input.txt";

pub fn main() !void {
    const sum = try calculate_distance(file_name);
    debug.print("Sum: {d}", .{sum});
}

pub fn calculate_distance(file_path: []const u8) !u32 {
    const allocator = std.heap.page_allocator;
    var left = std.ArrayList(i32).init(allocator);
    var right = std.ArrayList(i32).init(allocator);

    var file = try fs.cwd().openFile(file_path, .{ .mode = fs.File.OpenMode.read_only });
    defer file.close();
    var reader = file.reader();

    var output: [100]u8 = undefined;
    var output_fbs = io.fixedBufferStream(&output);
    const writer = output_fbs.writer();

    while (true) {
        reader.streamUntilDelimiter(writer, '\n', null) catch |err| {
            switch (err) {
                error.EndOfStream => {
                    output_fbs.reset();
                    break;
                },
                else => {
                    debug.print("Error while reading file: {any}\n", .{err});
                    return err;
                },
            }
        };

        const line = output_fbs.getWritten();
        var columns = std.mem.splitSequence(u8, line, "   ");
        const l = try std.fmt.parseInt(i32, columns.next().?, 10);
        const r = try std.fmt.parseInt(i32, columns.next().?, 10);
        try left.append(l);
        try right.append(r);

        output_fbs.reset();
    }

    std.mem.sort(i32, left.items, {}, comptime std.sort.asc(i32));
    std.mem.sort(i32, right.items, {}, comptime std.sort.asc(i32));

    var res: u32 = 0;
    for (left.items, right.items) |l, r| {
        res += @abs(l - r);
    }
    return res;
}
